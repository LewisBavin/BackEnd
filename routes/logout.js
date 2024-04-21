const express = require("express");
const router = express.Router();
const promiseSQL = require("../mySQL/driver");
const { deleteSessionToken, deleteAll } = require("../mySQL/queryFuncs");
const { verifyUser } = require("../middleware");

router.delete("/this", verifyUser, async (req, res) => {
  await promiseSQL(deleteSessionToken(req.headers.token));
  res.send({ status: 1, token: req.headers.token });
});

router.delete("/all", verifyUser, async (req, res) => {
  await promiseSQL(deleteAll("sessions", "user_id", req.body.userID));
  res.send({ status: 1 });
});

module.exports = router;
