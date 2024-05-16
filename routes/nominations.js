const express = require("express");
const router = express.Router();
const promiseSQL = require("../mySQL/driver");
const { verifyUser } = require("../middleware");

router.post("/add", verifyUser, async (req, res) => {
  let { user_id, transputs } = req.body;


  if (!transputs) {
    res.send({ status: 0, err: "Bad Nomination Data Received" });
  } else {
    let sqlString = `INSERT INTO nominations
                    (id, user_id, transput, start_date, end_date, volume, total_volume, timestamp)
                    VALUES
                    `;
    Object.values(transputs).forEach((values, i) => {
      let { transput, start_date, end_date, volume, total_volume } = values;
      sqlString = `${sqlString}
                  ${i ? "," : ""} 
                  (NULL, ${user_id}, "${transput}", "${start_date}", "${end_date}", ${volume}, ${total_volume}, current_timestamp())`;
    });
    sqlString = `${sqlString};`;
    try {
      let results = await promiseSQL(sqlString);
      res.send({ status: 1, results });
    } catch (e) {

      res.send({ status: 0, err: e });
    }
  }
});

module.exports = router;
