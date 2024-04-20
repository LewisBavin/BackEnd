const express = require("express");
const app = express();
const cors = require("cors");
const sha256 = require("sha256");
const { salt } = require("./secrets");
app.use(cors()); //slides in a few weeks about this

//users statecle
const users = [
  {
    email: "test@outlook.com",
    id: 0,
    username: "test",
    password: sha256("password" + salt),
  },
];
let lastUserId = { value: 1000 };
app.use(express.json());

//middleware that adds the users array to the request
app.use(function (req, res, next) {
  req.users = users;
  req.lastUserId = lastUserId;
  req.saltify = function (password) {
    return sha256(password + salt);
  };
  next();
});

app.use("/user/add", require("./routes/addUser"));

const PORT = process.env.PORT || 6002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
