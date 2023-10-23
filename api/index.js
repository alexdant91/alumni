const express = require("express");
const app = express.Router();

/**
 * @path /api/status
 */

app.all("/status", (_, res) => {
  return res.status(200).json({ message: "api online" });
});

/**
 * @path /api/users
 */

app.use("/users", require("./routes/users"));

module.exports = app;
