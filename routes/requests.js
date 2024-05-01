const express = require("express");
const router = express.Router();
const promiseSQL = require("../mySQL/driver");
const { getUser } = require("../mySQL/queryFuncs");
const { verifyUser } = require("../middleware");

router.post("/add", verifyUser, async (req, res) => {
  let values = "";
  let { user_id, requests } = req.body;

  if (!requests) {
    res.send({ status: 0, err: "Bad Request Data Received" });
    return;
  }
  for (let i = 0; i < requests.length; i++) {
    let {
      counter_id,
      direction,
      start_date,
      end_date,
      volume,
      total_volume,
      price,
    } = requests[i];
    i ? (values += `, `) : null;
    values += `(NULL,
      ${user_id},
      ${counter_id},
      "${direction}", 
      "${start_date}", 
      "${end_date}", 
      ${volume}, 
      ${total_volume}, 
      ${price}, 
    current_timestamp())`;
  }

  try {
    let results = await promiseSQL(
      ` INSERT INTO requests
          (id, user_id, counter_id, direction, start_date, end_date, volume, total_volume, price, timestamp)
            VALUES 
                ${values};`
    );
    res.send({ status: 1 });
  } catch (err) {
    res.send({
      status: 0,
      err: "Error uploading request data. Please contact administrators",
    });
  }
});

router.post("/remove", verifyUser, async (req, res) => {
  let { submits } = req.body;
  if (!submits.removes) {
    res.send({ status: 0, err: "Bad Request Data Received" });
    return;
  }
  let { removes } = submits;
  let values = "(";
  for (let i = 0; i < removes.length; i++) {
    values += removes[i].id;
    values += ",";
  }
  values += "0)";

  let sqlString = `DELETE FROM requests WHERE id IN ${values};`;
  console.log(sqlString);

  try {
    let results = await promiseSQL(sqlString);
    res.send({ status: 1 });
  } catch (err) {
    res.send({
      status: 0,
      err: "Error removing requests. Please contact administrators",
    });
  }
});

router.post("/reject", verifyUser, async (req, res) => {
  let { submits } = req.body;
  if (!submits.rejects) {
    res.send({ status: 0, err: "Bad Request Data Received" });
    return;
  }
  let { rejects } = submits;
  let values = "(";
  for (let i = 0; i < rejects.length; i++) {
    values += rejects[i].id;
    values += ",";
  }
  values += "0)";

  let sqlString = `UPDATE requests
                    SET rejected = 1
                      WHERE id IN ${values};`;

  try {
    let results = await promiseSQL(sqlString);
    res.send({ status: 1, results });
  } catch (err) {
    res.send({
      status: 0,
      err: "Error rejecting requests. Please contact administrators",
    });
  }
  
});

router.post("/accept", verifyUser, async (req, res) => {
  let { submits } = req.body;
  if (!submits.accepts) {
    res.send({ status: 0, err: "Bad Request Data Received" });
    return;
  }
  let { accepts } = submits;
  let values = "(";
  for (let i = 0; i < accepts.length; i++) {
    values += accepts[i].id;
    values += ",";
  }
  values += "0)";

  let sqlString = `UPDATE requests
                    SET accepted = 1
                      WHERE id IN ${values};`;

  try {
    let results = await promiseSQL(sqlString);
    res.send({ status: 1, results });
  } catch (err) {
    res.send({
      status: 0,
      err: "Error accepting requests. Please contact administrators",
    });
  }
  
});

/* UPDATE requests
	SET volume = 
    	CASE
        	WHEN id = 88 then 500
        END
        , total_volume = 
        CASE 
        	WHEN id = 88 then 500
        END    
     WHERE id iN (88); */

module.exports = router;
