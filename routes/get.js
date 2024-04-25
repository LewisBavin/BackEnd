const express = require("express");
const router = express.Router();
const promiseSQL = require("../mySQL/driver");
const { getUser } = require("../mySQL/queryFuncs");
const { verifyUser } = require("../middleware");

router.get("/users", verifyUser, async (req, res) => {
  console.log("headers", req.headers);
  let users = await promiseSQL(
    `SELECT * FROM users WHERE
      id <> ${req.body.user_id};`
  );
  users = users.map((u) => {
    return { id: u.id, name: u.name };
  });
  res.send({ status: 1, users });
});

router.get("/requests", verifyUser, async (req, res) => {
  let userRequests = await promiseSQL(
    `SELECT *
      FROM requests 
        WHERE user_id = ${req.body.user_id};`
  );
  let counterRequests = await promiseSQL(
    `SELECT *
      FROM requests 
           WHERE counter_id = ${req.body.user_id};`
  );
  res.send({ status: 1, userRequests, counterRequests });
});

router.get("/:id/allocations", verifyUser, async (req, res) => {
  let results;
});

module.exports = router;
