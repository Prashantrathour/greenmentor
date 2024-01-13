const express = require("express");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const { userRouter } = require("./routes/user.router");

const { connection } = require("./config/db");
const { taskrouter } = require("./routes/task.router");
require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/api", taskrouter);
app.get("/", (req, res) => {
  res.json("Welcome ! greenmentor Api");
});

app.listen(process.env.port || 8080, async () => {
  try {
    await connection;
    console.log(`Running port ${process.env.port}`);
    console.log("connected to DB");
  } catch (err) {
    console.log(err);
    console.log("something went wrong");
  }
});
