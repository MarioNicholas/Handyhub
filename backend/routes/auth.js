const express = require("express");
const User = require("../models/user");
const expressValidator = require("express-validator");

const router = express.Router();

router.put("/signup", [
  expressValidator.check("username").custom((value, { req }) => {
    return User.findOne({ username: value }).then((userDoc) => {
      if (userDoc) {
        return Promise.reject("Username existed, please use another username");
      }
    });
  }),
]);

module.exports = router;
