const express = require("express");
const PORT = process.env.PORT || 5000;
const colors = require("colors");
const dotenv = require("dotenv");
const db = require("./config/db");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
dotenv.config({ path: "./config/config.env" });
db();
const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);

app.listen(
  PORT,
  console.log(`i am listening to port ${process.env.PORT}`.blue)
);
