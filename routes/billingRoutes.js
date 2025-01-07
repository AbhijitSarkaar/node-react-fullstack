const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    console.log("/api/stripe", req.body);
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    });

    //user data is present in req.user added by passport.deserializeUser

    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
