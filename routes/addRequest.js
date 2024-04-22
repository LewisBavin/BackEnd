const express = require("express");
const router = express.Router();
const promiseSQL = require("../mySQL/driver");
const { getUser } = require("../mySQL/queryFuncs");
const { verifyUser } = require("../middleware");

router.post("/", verifyUser, async (req, res) => {
  let { user_id, counter_id, direction, start_date, end_date, volume, price } =
    req.body;
  try {
    let results = await promiseSQL(
      ` INSERT INTO requests
          (id, user_id, counter_id, direction, start_date, end_date, volume, price, timestamp)
            VALUES 
                (NULL, 
                  ${user_id}, 
                  ${counter_id}, 
                  "${direction}", 
                  "${start_date}", 
                  "${end_date}", 
                  ${volume},
                  ${price}, 
                  current_timestamp());`
    );
    res.send({staus: 1, debug: results})
  } catch (e) {
    res.send({ status: 0, debug: e });
  }
});

module.exports = router;
