const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("dotenv").config();

require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

//middlewares
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("first middleware req.headers.cookie", req.headers.cookie);
  console.log("first middleware req.session", req.session);
  next();
});
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
// app.use((req, res, next) => {
//   console.log("second middleware req.headers.cookie", req.headers.cookie);
//   console.log("second middleware req.session", req.session);
//   next();
// });

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  //serve static files
  app.use(express.static("client/build"));

  //serve client index.html file for routes not being handled at server
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
