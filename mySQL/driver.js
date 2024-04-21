const mySQL = require("mysql");

const con = mySQL.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gasandpower",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

function promiseSQL(query, params) {
  return new Promise((resolve, reject) => {
    con.query(query, params,  (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}

module.exports = promiseSQL;
