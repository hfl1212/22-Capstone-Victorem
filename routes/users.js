import express, { response } from 'express';
import passportlocal from 'passport-local';
import passport from 'passport';
import { User } from "../models/model.js";

// This route handles all actions related to user authentication.

var router = express.Router();

var LocalStrategy = passportlocal.Strategy;

passport.use(new LocalStrategy({usernameField: 'email'}, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('error', 'You need to be signed in to visit')
    res.redirect('/signin')
  }
}

// trying to use isAuth for redirectrion after authentication
router.get('/', isAuth, function(req, res) {
  res.render('/');
});

router.post('/signup', async function(req, res) {
  try{
      const {username, email, password: plainTextPass} = req.body;

      let user = await User.findOne({email});
    
      if (user) { // User found, redirecting to signin page
        //req.flash('error', 'Sorry, email has already been registered.');
        console.log("Sorry, email has been registered.")
      } else if (email == "" || plainTextPass == "") { // All fields should be filled
        //req.flash('error', 'Please fill out all the fields.');
        console.log("Please fill out all the fields.")
      } else if (!email.includes("@uw.edu")) { // Should use UW email for registration
        //req.flash("Please register with UW email.")
        console.log("Please register with UW email.")
      } else if (plainTextPass.length < 6) { // Password should be longer than 6
        //req.flash("Password length should be longer than 6.");
        console.log("Password length should be longer than 6");
      } else {
        const newUser = new User({
            username: username,
            email: email,
            pets: [],
            contact: {
              snap: '',
              facebook:'',
              instagram:''
            }
        })
        User.register(newUser, plainTextPass)
        //await newUser.save();
        //req.flash('info', 'Account made, please log in...');
        console.log("Account made, please log in...")
        res.json({status: "success", message: "Account made, please log in..."})
      }
  } catch(err){
      console.log("There is an error")
      let statusInfo = {'status': 'error'}
      statusInfo.error = err
      res.send(err)
  }
})

router.post("/signin", passport.authenticate('local', {failureRedirect: '/'}), function(req, res) {
  // Needs to redirect to either Profile page of the user, or Landing page
  // Currently not redirecting to anywhere
  console.log(req.session)
  res.json({status: "success", user: req.user});
});

router.post("/signout", function(req, res) {
  req.logOut();
  res.json({status: "success"});
});

export default router;
