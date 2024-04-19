const express = require("express");
const router = express.Router();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const mySQL = require("mysql");

const con = mySQL.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gasandpower",
});

passport.use('local-login',
  new LocalStrategy(function verify(email, password, cb) {
    con.query(
      `SELECT * FROM users WHERE email = ${email};`,
      function (err, res, fields) {
        if (err) throw cb(err);
        console.log("result", res);
      }
    );
  })
);

module.exports = router;
