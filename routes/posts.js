import express from 'express';
var router = express.Router();

router.get('/posts', async function(req, res, next) {
    try{
        let allPosts = await req.db.Post.find()
        // let postsJson = allPosts.map(async (onePost) => {
        //     let pet = await req.db.Pet.findOne(onePost.petID)
        //     let user = await req.db.User.findOne(onePost.userID)
        //     let onePostJson = {
        //         username: user.username,
        //         petName: pet.name,
        //         petType: pet.type,
        //         description: onePost.description,
        //         start_date: onePost.start_date,
        //         end_date: onePost.end_date
        //     }
        //     return onePostJson
        // })
        res.json(allPosts)
    } catch(err){
        res.json({"status": "error", "error": err})
    }
});

router.post('/posts', async function(req, res) {
    if(!req.isAuthenticated()){
        res.json({"status": "error", "error": "not logged in"})
    } else {
        try{
            const newPost = new req.db.Post({
                petID: req.body.petID,
                userID: session.userID,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                description: req.body.description,
                img: req.body.img
            })
            await newPost.save();
            res.json({'status': 'success'})
        } catch(err){
            res.json({"status": "error", "error": err})
        }
    }
});

router.get('/pets', async function(req, res){
    if(!req.isAuthenticated()){
        res.json({"status": "error", "error": "not logged in"})
    } else {
        try {
            let user = await req.db.User.findOne({"username": req.user.username})
            let pets = user.pets
            res.json({"status": "success", "pets": pets})
        } catch (error) {
            res.json({"status": "error", "error": error})
        }
    }
})

export default router;
