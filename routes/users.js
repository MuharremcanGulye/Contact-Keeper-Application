const express = require("express");
const brcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require("config");

const { check, validationResult } = require("express-validator");

router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(),
    check("email", "E-Mail is Required").isEmail(),
    check("password", "Password needs to be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        name: name,
        email: email,
        password: password,
      });

      const salt = await brcrypt.genSalt(10);

      user.password = await brcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Server Error" });
      // status 500 is server error
    }
  }
);

module.exports = router;
