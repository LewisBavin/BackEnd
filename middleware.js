const promiseSQL = require("./mySQL/driver");
const {checkSessionToken} = require("./mySQL/queryFuncs");

async function verifyUser(req, res, next) {
  let results = await promiseSQL(checkSessionToken(req.headers.token));
  if (results.length) {
    req.body.userID = results[0].id
    next();
    return;
  }
  res.send({ status: 0, msg: "invalid token" });
}

module.exports = {verifyUser, checkSessionToken}