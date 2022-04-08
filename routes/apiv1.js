import express from 'express';
var router = express.Router();

router.get('/posts', async function(req, res, next) {
    try{
        let allPosts = await req.db.Post.find()
        res.json(allPosts)
    } catch(err){
        res.json({"status": "error", "error": err})
    }
});

router.post('/posts', async function(req, res) {
//     let session = req.session
//     if(!session.isAuthenticated){
//         res.send({"status": 'error', "error": "not logged in"})
//     } else{
        try{
            const newPost = new req.db.Post({
                pet_name: req.body.pet_name,
                pet_type: req.body.pet_type,
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
//     }
});

export default router;
