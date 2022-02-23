import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("connected to react!")
    res.send("Successfully connected to server!")
});

export default router;
