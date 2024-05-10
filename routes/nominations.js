const express = require("express");
const router = express.Router();
const promiseSQL = require("../mySQL/driver");
const { verifyUser } = require("../middleware");

router.post("/add", verifyUser, async (req, res) => {
  let { user_id, transputs } = req.body;

  if (!transputs) {
    res.send({ status: 0, err: "Bad Nomination Data Received" });
  } else {
    Object.entries(transputs).forEach(([key, values]) => {
      let { transput, start_date, end_date, volume, total_volume } = values;
      transputs[
        key
      ].sqlString = `(NULL, ${user_id}, "${transput}", "${start_date}", "${end_date}", ${volume}, ${total_volume}, current_timestamp())`;
    });
    try {
      let results = await promiseSQL(`
      INSERT INTO nominations
        (id, user_id, transput, start_date, end_date, volume, total_volume, timestamp)
            VALUES
        ${transputs.Input.sqlString}, ${transputs.Output.sqlString}
        ;`);
      res.send({ status: 1, results });
    } catch (e) {
        console.log(e)
      res.send({ status: 0, err: e });
    }
  }

  /*  try {
    let results = await promiseSQL(
      ` INSERT INTO requests
          (id, user_id, counter_id, direction, start_date, end_date, volume, total_volume, price, timestamp)
            VALUES 
                ${values};`
    );
    res.send({ status: 1, results });
  } catch (err) {
    res.send({
      status: 0,
      err: "Error uploading request data. Please contact administrators",
    });
  } */
});

module.exports = router;
