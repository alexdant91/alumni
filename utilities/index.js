const crypto = require("crypto");

const generateID = (length = 12) => {
  return crypto.randomBytes(length).toString("hex");
};

module.exports = {
  generateID,
};
