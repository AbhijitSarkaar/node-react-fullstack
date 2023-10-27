const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

/**
 * user - strategy callback provides the received user from database  
 */
passport.serializeUser((user, done) => {
    done(null, user.id)
})

/**
 * id - cookie value received in request
 */
passport.deserializeUser((id, done) => {

    //find the user from database 
    User.findById(id).then(user => {
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {

        User.findOne({googleId: profile.id})
            .then(existingUser => {
                if(existingUser) {
                    //existingUser found with profile id
                    done(null, existingUser)
                }
                else {
                    //create new user 
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user))
                }
            })
    })
)
