const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { randomString } = require("../utils");
const salt = require("../secrets");
const promiseSQL = require("../mySQL/driver");
const { authEmailPassowrd, addSessionToken } = require("../mySQL/queryFuncs");

router.post("/", async (req, res) => {
  let { email, password } = req.body;
  password = sha256(password + salt);
  let results = await promiseSQL(authEmailPassowrd(), [email, password]);
  if (results.length === 1) {
    let token = randomString(20);
    await promiseSQL(addSessionToken(results[0].id, token));
    res.send({ status: 1, token, debug: "fuck" });
    return;
  }
  res.send({
    staus: 0,
    msg: "invalid email & passwrod",
  });
});

module.exports = router;
