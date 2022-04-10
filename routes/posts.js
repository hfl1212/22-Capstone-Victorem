import express from 'express';
var router = express.Router();

router.get('/posts', async function(req, res, next) {
    try{
        let allPosts = await req.db.Post.find()
        let postsJson = allPosts.map(async (onePost) => {
            let pet = await req.db.Pet.findOne(onePost.petID)
            let user = await req.db.User.findOne(onePost.userID)
            let onePostJson = {
                username: user.username,
                petName: pet.name,
                petType: pet.type,
                description: onePost.description,
                start_date: onePost.start_date,
                end_date: onePost.end_date
            }
            return onePostJson
        })
        res.json(postsJson)
    } catch(err){
        res.json({"status": "error", "error": err})
    }
});

router.post('/posts', async function(req, res) {  
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
            let statusInfo = {'status': 'success'}
            res.send(statusInfo)
        } catch(err){
            res.json({"status": "error", "error": err})
        }
});

export default router;
