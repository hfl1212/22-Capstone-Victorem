import express from 'express';
var router = express.Router();

router.get('/', async function(req, res, next) {
    try{
        let allPosts = await req.db.Post.find()
        let postsJson = await Promise.all(allPosts.map(async (post) => {
            let onePost = {}
            let pet = await req.db.Pet.findById(post.petID)
            onePost.pet = pet
            onePost.userID = post.userID
            onePost.start_date = post.start_date
            onePost.end_date = post.end_date
            onePost.description = post.description
            onePost.img = post.img
            return onePost
        }))
        res.json(postsJson)
    } catch(err){
        res.json({"status": "error", "error": err})
    }
});

router.post('/', async function(req, res) {
    if(!req.isAuthenticated()){
        res.json({"status": "error", "error": "not logged in"})
    } else {
        try{
            const newPost = new req.db.Post({
                userID: req.user._id,
                petID: req.user.pets[0],
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                description: req.body.description,
                img: req.body.img
            })
            await newPost.save();
            console.log("saved")
            res.json({'status': 'success'})
        } catch(error){
            res.json({"status": "error", "error": error})
        }
    }
});

router.delete('/', async function(req, res) {
    if(!req.isAuthenticated()){
        res.json({"status": "error", "error": "not logged in"})
    } else {
        try{
            let postID = req.body.postID
            let post = await req.db.Post.findById(postID)
            console.log(postID, post);
            console.log(req.user._id, post.userID)
            if(req.user._id.toString() === post.userID){
                await req.db.Post.deleteOne({ _id: postID });
                res.json({status: 'success'})
            } else {
                res.json({
                    status: "error",
                    error: "you can only delete your own posts",
                  });
            }
        } catch(error){
            res.json({"status": "error", "error": error})
        }
    }
})

router.get('/pets', async function(req, res){
    if(!req.isAuthenticated()){
        res.json({"status": "error", "error": "not logged in"})
    } else {
        try {
            let user = req.user
            let petInfo = await req.db.Pet.findById(user.pets[0])
            res.json({"status": "success", "pets": [petInfo]})
        } catch (error) {
            res.json({"status": "error", "error": error})
        }
    }
})

export default router;
