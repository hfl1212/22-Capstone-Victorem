import express, { response } from 'express';
import bcryptjs from 'bcryptjs';

var router = express.Router();

// Middleware for redirection after authentication
const isAuth = (req, res, next) => {
  if(req.session.isAuth) {
    next()
  } else {
    res.redirect('/signin')
  }
}

// trying to use isAuth boolean for redirectrion after authentication
router.get('/', isAuth, function(req, res) {
  res.render('/');
});

router.post('/signup', async function(req, res) {
  try{
      const {username, email, password: plainTextPass} = req.body;

      let user = await req.db.User.findOne({email});

      // Can't register with the same email
      // TO DO: Not actually redirecting 
      if (user) {
        return res.redirect('/signup')
      }

      const password = await bcryptjs.hash(plainTextPass, 10);
      const newUser = new req.db.User({ // ? 
          username: username,
          email: email,
          password: password
      })
      await newUser.save();
      res.json({'status': 'success'})
  } catch(err){
    res.json({"status": "error", "error": err})
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

  // Authenticate password 
  if (await bcryptjs.compare(req.body.password, user.password)) {
    session.username = user.username;
    session.email = user.email;

    console.log(session)
    session.isAuth = true;
    // TODO: Suppose to redirect to some other pages
    res.send("Welcome, " + session.username);
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
