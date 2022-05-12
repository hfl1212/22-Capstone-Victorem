import express from 'express';
var router = express.Router();

router.get('/', async function(req, res){
    if(!req.isAuthenticated()){
        res.json({"status": "error", "error": "not logged in"})
    } else {
        let userID
        if(req.query.user == undefined) {
            userID = req.user._id
        } else{
            userID = req.query.user
        }
        try {
            let user = await req.db.User.findById(userID)
            let pets = [{}]
            if(user.pets.length > 0) {
                pets[0] = await req.db.Pet.findById(user.pets[0])
            }
            let posts = await req.db.Post.find({userID: userID})
            let userInfo = {
                username: user.username,
                profilePhoto: user.profilePhoto,
                contact: user.contact,
                pets: pets,
                posts: posts,
                isFirstTime: user.isFirstTime
            }
            res.json({"status": "success", "userInfo": userInfo})
        } catch (error) {
            res.json({"status": "error", "error": "User not found!"})
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
            user.profilePhoto = req.body.profilePhoto
            user.contact = req.body.contact
            let newPetInfo = req.body.pets[0]
            if(newPetInfo.name && newPetInfo.type) {
                let pet;
                if(user.pets.length === 0) { // if user adding a new pet
                    pet = new req.db.Pet(newPetInfo)
                    user.pets.push(pet._id)
                    pet.userID = req.user._id
                } else { // if user is modifying existing pet
                    pet = await req.db.Pet.findById(user.pets[0])
                    pet.name = newPetInfo.name
                    pet.type = newPetInfo.type
                    pet.breed = newPetInfo.breed
                    pet.size = newPetInfo.size
                    pet.gender = newPetInfo.gender
                    pet.age = newPetInfo.age
                    pet.bio = newPetInfo.bio
                    pet.img = newPetInfo.img
                }
                await pet.save()
            }
            user.isFirstTime = false
            await user.save()
            res.json({"status": "success"})
        } catch (error) {
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

router.get('/user', async function(req, res) {
    if(!req.isAuthenticated()){
        res.json({"status": "error", "error": "not logged in"})
    } else {
        let userID = req.query.user
        try {
            let user = await req.db.User.findById(userID)
            let pets = [{}]
            if(user.pets.length > 0) {
                pets[0] = await req.db.Pet.findById(user.pets[0])
            }
            let posts = await req.db.Post.find({userID: userID})
            let userInfo = {
                username: user.username,
                profilePhoto: user.profilePhoto,
                contact: user.contact,
                pets: pets,
                posts: posts,
                isFirstTime: user.isFirstTime
            }
            res.json({"status": "success", "userInfo": userInfo})
        } catch (error) {
            res.json({"status": "error", "error": "User not found!"})
        }
    }
})

export default router;