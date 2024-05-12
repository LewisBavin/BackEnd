const mySQL = require("mysql");

const databaseName = "tradenice";
const dateFns = require("date-fns");

const con = mySQL.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: databaseName,
});

con &&
  con.connect((err) => {
    if (err) throw err;
    console.log("Connected to mySQL");
  });

(async function updateRequests() {
  if (con) {
    let requests = await promiseSQL(
      `UPDATE requests
        SET timeout = 1 WHERE accepted = 0 AND start_date < '${dateFns.format(
          dateFns.startOfDay(new Date()),
          "yyyy-MM-dd)"
        )}' AND end_date < '${dateFns.format(
        dateFns.startOfDay(new Date()),
        "yyyy-MM-dd)"
      )}'`
    );
    console.log(
      requests ? "requests updated successfuly" : "couldn't update requests"
    );
  }
})();

let a = [1, 2, 3];
console.log(a[-1]);

function promiseSQL(query, params) {
  return new Promise((resolve, reject) => {
    con.query(query, params, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}

module.exports = promiseSQL;
