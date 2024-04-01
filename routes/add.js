const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const Joi = require("joi");

const schema = Joi.object.keys({
  email: Joi.string().email({ tlds: { allow: false } }),
  username: Joi.string().alphanum().min(4).max(10).required(),
  password: Joi.string().alphanum().min(8).required(),
});

router.post("/", (req, res) => {
  let { email, username, password } = req.body;
  let users = req.users;
  let msg = {};
  let result = Joi.valid();
  msg.email = !email
    ? "please enter eMail"
    : !!users.filter((u) => u.email === email)[0]
    ? "eMail already registered!"
    : null;

  msg.username = !username
    ? "please enter username"
    : !!users.filter(
        (u) => u.username.toLowerCase() === username.toLowerCase()
      )[0]
    ? "username already registered!"
    : null;

  console.log(msg);
});

module.exports = router;
