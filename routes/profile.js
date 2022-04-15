import express from 'express';
import db from '../db.js';
var router = express.Router();

router.get('/', async function(req, res){
    if(!req.isAuthenticated()){
        res.json({"status": "error", "error": "not logged in"})
    } else {
        try {
            let user = await req.db.User.findById(req.user._id)
            let userInfo = {
                username: user.username,
                contact: user.contact
            }
            let pet = await req.db.Pet.findById(user.pets[0]._id)
            res.json({"status": "success", user: userInfo, pet: pet})
        } catch (error) {
            res.json({"status": "error", "error": error})
        }
    }
})

router.post('/', async function(req, res){
    if(!req.isAuthenticated()){
        res.json({"status": "error", "error": "not logged in"})
    } else{
        try {
            let user = await req.db.User.findById(req.user._id)
            user.username = req.body.username
            user.contact = req.body.contact
            await user.save()
            res.json({"status": "success"})
        } catch (error) {
            res.json({"status": "error", "error": error})
        }
    }
})

router.patch('/', async function(req, res){
    if(!req.isAuthenticated()){
        res.json({"status": "error", "error": "not logged in"})
    } else{
        try{
            if(req.body.updateType === "user"){
                await db.User.update({"_id": req.user._id},{$set: req.body.updateInfo})
            } else {
                let user = await db.User.findById(req.user._id)
                await db.Pet.update({"_id": user.pet[0]._id},{$set: req.body.updateInfo})
            }
            res.json({"status": "success"})
        } catch (error){
            res.json({"status": "error", "error": error})
        }
    }
})

router.post('/pet', async function(req, res){
    if(!req.isAuthenticated()){
        res.json({"status": "error", "error": "not logged in"})
    } else{
        try {
            const newPet = new req.db.Pet({
                userID: req.user.userID,
                name: req.body.name,
                type: req.body.type,
                breed: req.body.breed,
                size: req.body.size,
                gender: req.body.gender,
                age: req.body.age
            })
            await newPet.save()
            res.json({"status": "success"})
        } catch (error) {
            res.json({"status": "error", "error": error})
        }
    }
})

export default router;