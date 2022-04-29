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
      let statusInfo = {}
      if (user) { // User found, redirecting to signin page
        statusInfo.status = 'error'
        statusInfo.message = "Sorry, email has been registered."
      } else {
        const newUser = new User({
            username: username,
            email: email,
            pets: [],
            contact: {
              facebook:'',
              instagram:''
            },
            isFirstTime: true
        })
        User.register(newUser, plainTextPass, function(err, user) {
          if (err){
            console.log(err)
            statusInfo.status = "error"
            statusInfo.message = err
          } else{
            statusInfo.status = "success"
            statusInfo.message = "Successfully registered! Please log in ..."
          }
          res.json(statusInfo)
        })
      }
  } catch(err){
    console.log(err)
    res.json({'status': 'error', 'message': err})
  }
})

router.post('/signin', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.json({status: "error", message: info.message })
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({status: "success", user: user})
    });
  })(req, res, next);
});

router.post("/signout", function(req, res) {
  req.logOut();
  res.json({status: "success"});
});

export default router;
