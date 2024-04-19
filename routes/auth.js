const express = require("express");
const router = express.Router();

const sha256 = require("sha256");
const salt = require("../secrets");
const promiseSQL = require("../mySQL/driver");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  "local-login",
  new LocalStrategy(function (email, password, done) {
    return done(null, email);
  })
);

module.exports = router;
