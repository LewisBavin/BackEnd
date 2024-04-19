const mySQL = require("mysql");

const con = mySQL.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gasandpower",
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!" );
});


function promiseSQL(query) {
  return new Promise((resolve, reject) => {
    con.query(query, (err, res) => {
      if (err) {
        console.log("HAHAHAHAHAHAHAHAHA")
        reject(err);
        return;
      }
      resolve(res);
    });
  });
}

function promiseSQL() {}

module.exports = promiseSQL;
