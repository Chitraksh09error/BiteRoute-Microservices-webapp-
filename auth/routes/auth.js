const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// 🔐 SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send({ msg: "User created", user });
  } catch (err) {
    res.status(500).send(err);
  }
});

// 🔐 LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne(req.body);

    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET
    );

    res.send({ token });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;