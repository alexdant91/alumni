const express = require("express");
const app = express.Router();

const Joi = require("joi");
const { generateID } = require("../../utilities");

let users = [];

/**
 * @path /api/users
 */

app.post("/", (req, res) => {
  const schema = Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
  });

  const id = generateID();

  try {
    const data = schema.validate(req.body);

    if (data.error) {
      return res.status(500).json({ error: "Internal server error" });
    }

    const duplicate = users.find(
      (user) => user.email.toUpperCase() == data.value.email.toUpperCase()
    );

    if (!duplicate) {
      const user = { id, ...data.value };
      users.push(user);

      return res.status(201).json(user);
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @path /api/users
 */

app.get("/", (_, res) => {
  return res.status(200).json(users);
});

/**
 * @path /api/users/:id
 */

app.get("/:id", (req, res) => {
  const id = req.params.id;

  const user = users.find((user) => user.id == id);

  return res.status(200).json(user);
});

/**
 * @path /api/users/:id
 */

app.put("/:id", (req, res) => {
  const { id } = req.params;

  const schema = Joi.object().keys({
    name: Joi.string().optional(),
    password: Joi.string().optional(),
  });

  const data = schema.validate(req.body);

  if (data.error) {
    return res.status(500).json({ error: "Internal server error" });
  }

  const userIndex = users.findIndex((user) => user.id == id);

  if (userIndex == -1) {
    return res.status(500).json({ error: "Internal server error" });
  }

  users[userIndex] = { ...users[userIndex], ...data.value };

  return res.status(200).json(users[userIndex]);
});

/**
 * @path /api/users/:id
 */

app.delete("/:id", (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id != id);

  return res.status(200).json(users);
});

module.exports = app;
