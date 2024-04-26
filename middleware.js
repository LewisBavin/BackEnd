const promiseSQL = require("./mySQL/driver");
const { checkSessionToken } = require("./mySQL/queryFuncs");

async function verifyUser(req, res, next) {
  console.log(req.headers.token)
  let results = await promiseSQL(checkSessionToken(req.headers.token));
  if (results.length) {
    req.body.user_id = results[0].id;
    res.cookie("token", "hello world");
    next();
    return;
  }
  res.send({ status: 0, msg: "invalid token" });
}

module.exports = { verifyUser, checkSessionToken };
