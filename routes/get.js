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

router.get("/requests/pending", verifyUser, async (req, res) => {
  let { start_date, end_date } = req.headers;

  let inputs = await promiseSQL(
    `SELECT *
      FROM requests 
        WHERE 
          (pending = 1 AND user_id = ${req.body.user_id} AND direction = "B" AND timeout = 0 AND
            (start_date >= "${start_date}" AND start_date <= "${end_date}"))
          OR
          (pending = 1 AND counter_id = ${req.body.user_id} AND direction = "S" AND timeout = 0 AND
            (start_date >= "${start_date}" AND start_date <= "${end_date}"))
    ;`
  );
  let outputs = await promiseSQL(
    `SELECT *
    FROM requests 
      WHERE 
        (pending  = 1 AND user_id = ${req.body.user_id} AND direction = "S" AND timeout = 0 AND
          (start_date >= "${start_date}" AND start_date <= "${end_date}"))
        OR
        (pending = 1 AND counter_id = ${req.body.user_id} AND direction = "B" AND timeout = 0 AND
          (start_date >= "${start_date}" AND start_date <= "${end_date}"))
  ;`
  );
  res.send({ status: 1, inputs, outputs });
});

router.get("/matched", verifyUser, async (req, res) => {
  let { start_date, end_date } = req.headers;

  let matched = await promiseSQL(
    `SELECT *
      FROM requests 
        WHERE 
          (accepted = 1 AND 
          start_date >= "${start_date}" AND 
          start_date <= "${end_date}" AND
          user_id = ${req.body.user_id})
            
          OR
          (accepted = 1 AND 
            start_date >= "${start_date}" AND 
            start_date <= "${end_date}" AND
            counter_id = ${req.body.user_id})
    ;`
  );
  let disputes = await promiseSQL(`SELECT * FROM disputes`);
  matched.forEach((m) =>
    disputes.forEach((d) => {
      m.id == d.trade_id ? (m.disputed = true) : null;
    })
  );
  res.send({ status: 1, matched });
});

module.exports = router;
