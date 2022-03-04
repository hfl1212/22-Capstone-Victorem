import express from 'express';
var router = express.Router();

router.get('/posts', async function(req, res, next) {
    try{
        let allPosts = await req.db.Post.find()
        let results = await Promise.all(allPosts.map(async (post) => {
            let result = {}
            result.pet_name = post.pet_name
            result.pet_type = post.pet_type
            result.start_date = new Date(post.start_date.getFullYear(), post.start_date.getMonth(),post.start_date.getDate())
            result.end_date = new Date(post.end_date.toDateString())
            result.description = post.description
            result.img = post.img
            return result;
        }))
        res.send(results)
    } catch(err){
        res.send("Error: " + err)
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
            console.log(newPost)
            await newPost.save();
            let statusInfo = {'status': 'success'}
            res.send(statusInfo)
        } catch(err){
            let statusInfo = {'status': 'error'}
            statusInfo.error = err
            res.send(statusInfo)
        }
//     }
});

export default router;
