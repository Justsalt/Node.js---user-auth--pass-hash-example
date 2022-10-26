const express = require("express");
const session = require("express-session");
const app = express();

app.use(
  session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
  })
);

module.exports = {
  isAuth: async (req, res, next) => {
    if (req.session.isAuth) {
      next();
    } else {
      res.redirect("/");
    }
  },
};
