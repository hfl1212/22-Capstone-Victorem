import express from 'express';
var router = express.Router();

router.get('/profile', function(req, res){
    res.json({status: "success"})
})

router.post('/profile', function(req, res){
    res.json({status: "success"})
})

export default router;