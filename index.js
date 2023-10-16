require("dotenv").config();

const express = require("express");
const app = express();

const helmet = require("helmet");
const cors = require("cors");

app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.all(["/", "/ping", "/status"], (_, res) => {
  return res.status(200).json({ message: "online" });
});

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => {
  console.log(`Server up and running on port ${SERVER_PORT}`);
});
