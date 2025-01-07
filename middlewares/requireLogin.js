module.exports = (req, res, next) => {
  // check req.user added by deserializeUser
  // deserializeUser adds req.user from session data provided by 'passport-session'
  // 'cookie-session' adds a 'session' property to req object from received cookie in http request header from client
  // fundamentals here is for authenticated users, 'session' cookie will be present in http request from client
  // that'll contain a valid user id which will be used by deserializeUser to get a user details and add to req.user

  if (!req.user) {
    return res.status(401).send({
      error: "User must be logged in!",
    });
  }

  next();
};
