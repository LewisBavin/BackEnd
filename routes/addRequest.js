const express = require("express");
const router = express.Router();
const promiseSQL = require("../mySQL/driver");
const { getUser } = require("../mySQL/queryFuncs");
const { verifyUser } = require("../middleware");

router.post("/", verifyUser, async (req, res) => {
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

module.exports = router;
