const passport = require("passport");

module.exports = (app) => {
  app.get(
    //initial request uri
    "/auth/google",

    //passport initialises authentication by calling google oauth system
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    // callback url once google oauth flow returns a code
    "/auth/google/callback",

    // middleware
    // passport sends 'code' to google to get users profile data
    // once authenticated passport calls serializeUser to set user data in req.session
    passport.authenticate("google"),

    // route handler once user has been authenticated
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/current_user", (req, res) => {
    // res.send(req.session);
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    //added to request by passport
    req.logout();
    res.redirect("/");
  });
};
