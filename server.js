const express = require("express");
const app = express();
const cors = require("cors");
const sha256 = require("sha256");
const {salt}  = require("./salt");
app.use(cors()); //slides in a few weeks about this

//users state
const users = [{ email: "gas1@outlook.com" , id: 0, username: "gas1", password: sha256("password" + salt)}];
let lastUserId = { value: 1000 };

app.use(express.json());

//middleware that adds the users array to the request
app.use(function (req, res, next) {
  req.users = users;
  req.lastUserId = lastUserId;
  next();
});
/* 
app.use("/user/get", require("./routes/get"));
app.use("/user/add", require("./routes/add"));
app.use("/user/delete", require("./routes/delete"));
app.use("/user/update", require("./routes/update")); */

app.use("/auth", require("./routes/get"));
app.use("/signUp", require("./routes/add"));

const PORT = process.env.PORT || 6002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
