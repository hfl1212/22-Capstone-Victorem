import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', async function(req, res) {
  try{
      const newUser = new req.db.User({ // ? 
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
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
    email: req.body.email,
    password: req.body.password
  }
  let user = await req.db.User.find(authUser)

  if(user[0]) {
    // session.userid = user._id.toString()
    session.username = user[0].username
    session.email= user[0].email
    console.log(session)
    res.send("Welcome, " + session.username)
  }else { 
    //not start session
    req.session.destroy()
    res.send("wrong login info")
  }
})

router.post("/signout", function(req, res, next) {
  req.session.destroy()
  res.send("you are logged out")
})


export default router;
