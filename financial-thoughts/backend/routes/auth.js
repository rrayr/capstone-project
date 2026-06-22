const express = require("express");
const User = require("../models/User");
const { createToken } = require("../helpers/tokens");

const router = new express.Router();

// Register
router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register(req.body);

    const token = createToken(user);

    return res.status(201).json({
      token
    });
  } catch (err) {
    return next(err);
  }
});

// Login
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.authenticate(
      username,
      password
    );

    if (!user) {
      return res.status(401).json({
        error: "Invalid username/password"
      });
    }

    const token = createToken(user);

    return res.json({
      token
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;