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

router.get("/requests/valid", verifyUser, async (req, res) => {
  let { start_date, end_date } = req.headers;
  console.log(req.body.user_id, start_date, end_date);

  let trades = await promiseSQL(
    `SELECT *
      FROM requests 
        WHERE 
          (timeout = 0 AND rejected = 0  AND user_id = ${req.body.user_id} AND
            ("${start_date}" BETWEEN start_date AND end_date))
    ;`
  );
  let transputs = await promiseSQL(`
  SELECT *
    FROM nominations
      WHERE
        (timestamp = 
          (
             SELECT MAX(timestamp) FROM nominations 
               WHERE 
                 user_id = ${req.body.user_id} AND "${start_date}" BETWEEN start_date AND end_date AND transput = "I"
           )
         ) OR
 
         (timestamp = 
           (
              SELECT MAX(timestamp) FROM nominations 
                WHERE 
                  user_id = ${req.body.user_id} AND "${end_date}" BETWEEN start_date AND end_date AND transput = "O"
            )
          )
              ;`);

  res.send({ status: 1, trades, transputs });
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
  let disputes = await promiseSQL(
    `SELECT * FROM disputes WHERE user_agreed <> counter_agreed`
  );
  matched.forEach((m) =>
    disputes.forEach((d) => {
      m.id == d.trade_id ? (m.disputed = true) : null;
    })
  );
  res.send({ status: 1, matched });
});

router.get("/disputes", verifyUser, async (req, res) => {
  let { start_date, end_date } = req.headers;
  let { user_id } = req.body;

  let disputes = await promiseSQL(`
    SELECT *
      FROM requests r
        JOIN disputes d
          ON  (r.id = d.trade_id AND
              r.start_date BETWEEN "${start_date}" AND "${end_date}")
                  OR
              (r.id = d.trade_id AND
              r.end_date BETWEEN "${start_date}" AND "${end_date}")
      WHERE
      (d.dispute_user_id = ${user_id})
        OR
      (d.dispute_counter_id = ${user_id});  
  `);

  res.send({ status: 1, disputes });
});

router.get("/nominations", verifyUser, async (req, res) => {
  let { datestring } = req.headers;
  let { user_id } = req.body;

  try {
    let results = await promiseSQL(`
 SELECT *
   FROM nominations
     WHERE
       (timestamp = 
         (
            SELECT MAX(timestamp) FROM nominations 
              WHERE 
                user_id = ${user_id} AND "${datestring}" BETWEEN start_date AND end_date AND transput = "I"
          )
        ) OR

        (timestamp = 
          (
             SELECT MAX(timestamp) FROM nominations 
               WHERE 
                 user_id = ${user_id} AND "${datestring}" BETWEEN start_date AND end_date AND transput = "O"
           )
         )
             ;`);

    res.send({ status: 1, results });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, err: e });
  }
});

module.exports = router;
