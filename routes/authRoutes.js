const passport = require("passport");

module.exports = (app) => {
  app.get("/data", (req, res) => {
    // console.log("/data", req.headers);
    console.log("/data req.session", req.session);
    // console.log("/data req._passport", req._passport);
    res.send("data");
  });

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
      console.log("/auth/google/callback");
      console.log("req.session", req.session);
      res.redirect("/surveys");
    }
  );

  app.get("/api/current_user", (req, res) => {
    console.log("/api/current_user", req.session);
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    //added to request by passport
    //req.logout removes req.user and clears req.session.passport
    req.logout();
    res.redirect("/");
  });
};
