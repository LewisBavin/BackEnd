const express = require("express");
const router = express.Router();
const promiseSQL = require("../mySQL/driver");
const { getUser } = require("../mySQL/queryFuncs");
const { verifyUser } = require("../middleware");

router.get("/", verifyUser, async (req, res) => {
  let results = await promiseSQL(getUser(req.headers.token));
  req.body.userDetails = results[0];
  res.send(req.body)
});

router.get("/requests", verifyUser, async (req, res) => {
  let results;
});

router.get("/:id/allocations", verifyUser, async (req, res) => {
  let results;
});

module.exports = router;
