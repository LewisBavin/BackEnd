const express = require("express");
const router = express.Router();
const sha256 = require("sha256");



router.get("/:username/:password", (req, res) => {
  let { username, password } = req.params;
  let { users } = req;
  let user = users.filter((u) => u.username === username)[0];
  res.send(
    !user
      ? { status: 0, msg: "Username not found, please check details" }
      : password !== user.password
      ? {
          status: 1,
          msg: "Incorrect password, please check details",
        }
      : {user: user}
  );
});

module.exports = router;
