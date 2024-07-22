const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../model/user')




module.exports = function(passport){
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, cb) => {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        }

        try {
            let user = await User.findOne({googleId: profile.id})
            if (user) {
                cb(null, user)
            }
            else {
                user = await User.create(newUser)
                cb(null, user)
            }
        } catch (error) {
            console.error(error);
            
        }




    }  
))

    passport.serializeUser((user, cb) =>{
        cb(null, user.id);
      });
      
    passport.deserializeUser(async (id, cb) => { // Changed to async function
        try {
            const user = await User.findById(id); // Removed callback syntax
            cb(null, user);
        } catch (err) {
            cb(err, null);
        }
    });
}



