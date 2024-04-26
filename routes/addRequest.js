const express = require("express");
const router = express.Router();
const promiseSQL = require("../mySQL/driver");
const { getUser } = require("../mySQL/queryFuncs");
const { verifyUser } = require("../middleware");

router.post("/", verifyUser, async (req, res) => {
  let values = "";
  let user_id = req.body.user_id;
  req.body.forEach((request) => {
    let {
      counter_id,
      direction,
      start_date,
      end_date,
      volume,
      total_volume,
      price,
    } = request;
    values += `(NULL,
      ${user_id},
      ${counter_id},
      "${direction}", 
      "${start_date}", 
      "${end_date}", 
      ${volume}, 
      ${total_volume}, 
      ${price}, 
    current_timestamp()),`;
  });
  console.log(values)
  return;

  try {
    let results = await promiseSQL(
      ` INSERT INTO requests
          (id, user_id, counter_id, direction, start_date, end_date, volume, total_volume, price, timestamp)
            VALUES 
                ${values};`
    );
    res.send({ staus: 1, results });
  } catch (err) {
    res.send({ status: 0, err });
  }
});

module.exports = router;
