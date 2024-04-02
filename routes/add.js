const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let { email, username, password } = req.body;
  let users = req.users;
  let lastUserId = req.lastUserId;
  let msg = {};

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

  if (!msg.email && !msg.username && !msg.password) {
    lastUserId.value += Math.floor(Math.random() * 9) + 1;
    req.users.push({
      email,
      username,
      password: req.saltify(password),
      id: lastUserId.value,
    });
    res.send({
      status: 300,
      msg: { success: username + " Successfully Registered!" },
      details: {username},
    });
  } else {
    res.send({ status: 0, msg });
  }
  console.log(users);
});

module.exports = router;
