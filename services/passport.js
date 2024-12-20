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
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) return done(null, existingUser);
      const user = await new User({
        googleId: profile.id,
      }).save();
      done(null, user);
    }
  )
);
