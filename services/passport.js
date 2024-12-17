const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

//callback redirect uri is specific to client application providing google sign in to users
//it is to securely provide the application with a code through the redirect uri
//redirect uri is configured in the google account of the application and it is secret

//purpose of oauth flow is to receive a unique id of a user
// from a third party providing oauth authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      //check if user already exists
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          //user already exists
          done(null, existingUser);
        } else {
          //new mongoose model instance created
          new User({
            googleId: profile.id,
          })
            // mongoose model instance saved
            .save()
            .then((user) => {
              done(null, user);
            });
        }
      });
    }
  )
);
