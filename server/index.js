const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  return res.send("hello");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
