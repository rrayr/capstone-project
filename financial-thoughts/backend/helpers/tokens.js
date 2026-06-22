const jwt = require("jsonwebtoken");

const SECRET_KEY =
  process.env.SECRET_KEY || "secret-dev";

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    SECRET_KEY
  );
}

module.exports = { createToken };