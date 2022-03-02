import express, { response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

var router = express.Router();
const JWT_SECRET = 'aalsdfkijqnm.alsdflizswi@aasdf&^2sdff'

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', async function(req, res) {
  try{
      const {username, email, password: plainTextPass} = req.body;
      const password = await bcryptjs.hash(plainTextPass, 10);
      const newUser = new req.db.User({ // ? 
          username: username,
          email: email,
          password: password
      })
      await newUser.save();
      let statusInfo = {'status': 'success'}
      res.send(statusInfo)
  } catch(err){
      let statusInfo = {'status': 'error'}
      statusInfo.error = err
      res.send(statusInfo)
  }
})

router.post("/signin", async function(req, res) {
    
  let session = req.session

  if(session.userid){
    res.send("Error: You are already logged in as " + session.username)
    return
  }
  const authUser = {
    email: req.body.email
  }
  console.log("Request user")
  console.log(authUser)
  let user = await req.db.User.findOne(authUser)
  console.log("User Found")
  console.log(user)
  if (!user) { return res.json({ status: 'error', error: 'Invalid username/password'}) }

  if (await bcryptjs.compare(req.body.password, user.password)) {
    const token = jwt.sign( {id: user._id, username: user.username, email: user.email }, JWT_SECRET )
    session.username = user.username;
    session.email = user.email;
    return res.send("Welcome, " + session.username)
    
  } else {
    req.session.destroy()
    res.send('Invalid username/password')
  }
})

router.post("/signout", function(req, res, next) {
  req.session.destroy()
  res.send("you are logged out")
})


export default router;
