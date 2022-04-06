import express, { response } from 'express';
import bcryptjs from 'bcryptjs';
import passportlocal from 'passport-local';
import passport from 'passport';

var router = express.Router();

import { User } from "../models/model.js";

var LocalStrategy = passportlocal.Strategy;

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function (email, password, done) {
    User.findOne({email})
    .then(user => {
      if (!user) {
        return done(null, false, {message: "Email is not registered"})
      }
    });
    bcryptjs.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {message: "Password incorrect"})
      }
    })
  }
));

// Users need to be signed in to see some pages
function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('error', 'You need to be signed in to visit')
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

      let user = await User.findOne({email});
    
      if (user) {
        req.flash('error', 'Sorry, email has already been registered.');
        console.log("Sorry, email has been registered.")
        return res.redirect('/signin');
      } else if (email == "" || plainTextPass == "") {
        req.flash('error', 'Please fill out all the fields.');
        console.log("Please fill out all the fields.")
        res.redirect('/signup');
      } else {
        const password = await bcryptjs.hash(plainTextPass, 10);
        const newUser = new User({
            username: username,
            email: email,
            password: password
        })
        await newUser.save();
        req.flash('info', 'Account made, please log in...');
        console.log("Account made, please log in...")
        res.redirect('/signin');
      }
  } catch(err){
      console.log("There is an error")
      let statusInfo = {'status': 'error'}
      statusInfo.error = err
      res.send(err)
  }
})

router.post("/signin", passport.authenticate('local', { failureRedirect: '/', failureMessage: true}), function(req, res) {
  res.status(200).send("Welcome, " + req.body.username);
});

router.post("/signout", function(req, res) {
  req.logOut();
  res.redirect('/login');
});


export default router;
