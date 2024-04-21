const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { randomString } = require("../utils");
const salt = require("../secrets");
const promiseSQL = require("../mySQL/driver");
const { addUser, addSessionToken } = require("../mySQL/queryFuncs");
const { verifyUser } = require("../middleware");

router.get("/id", verifyUser, async (req, res) => {});

module.exports = router;
