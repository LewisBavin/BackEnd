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
    res.send({ status: 1, results });
  } catch (err) {
    res.send({
      status: 0,
      err: "Error uploading request data. Please contact administrators",
    });
  }
});

router.post("/changes", verifyUser, async (req, res) => {
  let { submits } = req.body;
  let response = {};

  if (!submits) {
    res.send({ status: 0, err: "No Data received to the server" });
  } else {
    let { edits, removes, rejects, accepts } = submits;
    console.log(submits);
    if (edits.length) {
      let idWhere = "WHERE id IN (";
      let volumeWhen = "volume = CASE ",
        priceWhen = "price = CASE ",
        totalWhen = "total_volume = CASE ";
      for (let i = 0; i < edits.length; i++) {
        let { id, volume, total_volume, price } = edits[i];
        volumeWhen += `WHEN id=${id} THEN ${volume} `;
        priceWhen += `WHEN id=${id} THEN ${price} `;
        totalWhen += `WHEN id=${id} THEN ${total_volume} `;
        idWhere += !i ? `${id}` : `,${id}`;
      }
      (volumeWhen += `END`), (priceWhen += `END`), (totalWhen += `END`);
      idWhere += `)`;
      let sqlString = `UPDATE requests SET ${volumeWhen}, ${priceWhen}, ${totalWhen} ${idWhere};`;

      try {
        let results = await promiseSQL(sqlString);
        response.edits = results;
      } catch (err) {
        response.edits = {
          error: "error editing your existing requests. Please contact admin",
        };
      }
    }
    if (removes.length) {
      let values = "(";
      for (let i = 0; i < removes.length; i++) {
        (values += removes[i].id), (values += ",");
      }
      values += "0)";
      let sqlString = `DELETE FROM requests WHERE id IN ${values};`;

      try {
        let results = await promiseSQL(sqlString);
        response.removes = results;
      } catch (err) {
        response.removes = {
          error: "error removing your existing requests. Please contact admin",
        };
      }
    }
    if (rejects.length) {
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
        response.rejects = results;
      } catch (err) {
        response.rejects = {
          error: "error rejecting counterparty requests. Please contact admin",
        };
      }
    }
    if (accepts.length) {
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
        response.accepts = results;
      } catch (err) {
        response.accepts = {
          error: "error accepting counterparty requests. Please contact admin",
        };
      }
    }
    res.send(response);
  }
});

module.exports = router;
