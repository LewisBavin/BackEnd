const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { randomString } = require("../utils");
const salt = require("../secrets");
const promiseSQL = require("../mySQL/driver");
const { addUser, addSessionToken } = require("../mySQL/queryFuncs");

router.post("/", async (req, res) => {
  let { name, email, password } = req.body;
  password = sha256(password + salt);
  let token = randomString(20);

  try {
    let result = await promiseSQL(addUser(name, email, password));
    await promiseSQL(addSessionToken(result.insertId, token));
    res.send({
      status: 1,
      msg: name + " successfully added!",
      debug: result,
    });
  } catch (e) {
    res.send({ status: 0, msg: "Error adding " + name, debug: e });
  }
});

module.exports = router;
