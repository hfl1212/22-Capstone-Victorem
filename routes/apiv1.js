import express from 'express';
var router = express.Router();

router.get('/posts', async function(req, res, next) {
    try{
        console.log("backend working")
        let allPosts = await req.db.Post.find()
        let results = await Promise.all(allPosts.map(async (post) => {
            let result = {}
            result.petName = post.petName
            result.petType = post.petType
            result.start_date = post.start_date
            result.end_date = post.end_date
            result.description = post.description
            // result.imgUrl = post.imgUrl
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
                petName: req.body.petName,
                petType: req.body.petType,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                description: req.body.description
            })
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
