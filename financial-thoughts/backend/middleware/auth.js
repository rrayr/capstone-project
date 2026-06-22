const jwt = require("jsonwebtoken");

const SECRET_KEY =
  process.env.SECRET_KEY || "secret-dev";

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.replace(
        "Bearer ",
        ""
      );

      const payload = jwt.verify(
        token,
        SECRET_KEY
      );

      req.user = payload;
    }

    return next();
  } catch (err) {
    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      error: "Unauthorized"
    });
  }

  return next();
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn
};