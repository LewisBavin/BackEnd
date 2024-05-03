const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { randomString } = require("../utils");
const salt = require("../secrets");
const promiseSQL = require("../mySQL/driver");
const { addUser, addSessionToken, getUser } = require("../mySQL/queryFuncs");

router.post("/", async (req, res) => {
  let { name, email, password } = req.body;
  password = sha256(password + salt);
  let token = randomString(20);

  try {
    let result = await promiseSQL(addUser(name, email, password));
    await promiseSQL(addSessionToken(result.insertId, token));
    let user = await promiseSQL(getUser(token))
    res.send({
      status: 1,
      returnMsg: name + " successfully added!",
      user,
    });
  } catch (e) {
    let returnErr = {};
    let sqlMsg = e.sqlMessage;
    returnErr.email = sqlMsg.includes("email") ? "eMail already registered!" : ""
    returnErr.name = sqlMsg.includes("name") ? "Username already registered!" : ""
    res.send({ status: 0, errCode: e.code, returnErr });
  }
});

module.exports = router;
