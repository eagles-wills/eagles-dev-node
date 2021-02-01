const express = require("express");
const PORT = process.env.PORT || 5000;
const colors = require("colors");
const dotenv = require("dotenv");
const db = require("./config/db");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const postRouter = require("./routes/post");
const { errorHandler } = require("./middleware/error");
dotenv.config({ path: "./config/config.env" });
db();
const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/post", postRouter);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`i am listening to port ${process.env.PORT}`.blue)
);
