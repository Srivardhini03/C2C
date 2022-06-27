const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:80/users/auth/google/c2c",
//  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"


},function(accessToken,refreshToken,profile,done){
    // find user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
            console.log("error in google strategy ",err);
            return;
        }
        console.log(profile);
        // if found set this user as req.user
        if(user){
            return done(null,user);
        }else{
            // if not found create the new user set it as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){
                    console.log('Error in creating user ',err);
                    return;
                }
                return done(null,user);
            })
        }
    })
}


))

module.exports = passport;
