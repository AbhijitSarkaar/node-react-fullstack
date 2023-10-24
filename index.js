const express = require('express')
const dotenv = require('dotenv')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
dotenv.config()

const {CLIENT_ID, CLIENT_SECRET} = process.env

const app = express()

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile) => {
    console.log('accessToken', accessToken)
    console.log('refreshToken', refreshToken)
    console.log('profile', profile)
}))

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

app.get('/auth/google/callback', passport.authenticate('google'))

const PORT = process.env.PORT || 5000

app.listen(PORT)