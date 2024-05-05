const express = require("express");
const app = express();
const cors = require("cors");
const sha256 = require("sha256");
const { salt } = require("./secrets");
const cookieParser = require("cookie-parser");
const { rateLimit } = require("express-rate-limit");

//rate limiter
const limiterConfig = rateLimit({
  windowMs: 10000, // 15 minutes
  limit: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  //standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  //legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
app.use(limiterConfig);

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/signUp", require("./routes/addUser"));
app.use("/user/login", require("./routes/login"));
app.use("/user/logout", require("./routes/logout"));

app.use("/user/get", require("./routes/get"));
app.use("/user/requests", require("./routes/requests"));

const PORT = process.env.PORT || 6002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
