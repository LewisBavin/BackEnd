const express = require("express");
const router = express.Router();
const promiseSQL = require("../mySQL/driver");
const { getUser } = require("../mySQL/queryFuncs");
const { verifyUser } = require("../middleware");

router.get("/users", verifyUser, async (req, res) => {
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
  let { start_date, end_date } = req.headers;

  let inputs = await promiseSQL(
    `SELECT *
      FROM requests 
        WHERE 
          (rejected = 0 AND user_id = ${req.body.user_id} AND direction = "B" AND timeout = 0 AND
            (start_date >= "${start_date}" AND start_date <= "${end_date}"))
          OR
          (rejected = 0 AND counter_id = ${req.body.user_id} AND direction = "S" AND timeout = 0 AND
            (start_date >= "${start_date}" AND start_date <= "${end_date}"))
    ;`
  );
  let outputs = await promiseSQL(
    `SELECT *
    FROM requests 
      WHERE 
        (rejected = 0 AND user_id = ${req.body.user_id} AND direction = "S" AND timeout = 0 AND
          (start_date >= "${start_date}" AND start_date <= "${end_date}"))
        OR
        (rejected = 0 AND counter_id = ${req.body.user_id} AND direction = "B" AND timeout = 0 AND
          (start_date >= "${start_date}" AND start_date <= "${end_date}"))
  ;`
  );
  res.send({ status: 1, inputs, outputs });
});

router.get("/:id/allocations", verifyUser, async (req, res) => {
  let results;
});

module.exports = router;
