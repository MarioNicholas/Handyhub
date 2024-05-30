const express = require("express");
const User = require("../models/user");
const expressValidator = require("express-validator");
const fileUpload = require("../middleware/file-upload")


const authContoller = require("../controllers/auth");

const router = express.Router();

router.put(
  "/signup",
  [
    expressValidator.body("username").notEmpty().withMessage("Cannot be empty").custom((value, { req }) => {
      return User.findOne({ username: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject(
            "Username existed, please use another username"
          );
        }
      });
    }),
    expressValidator.body("name").trim().notEmpty(),
    expressValidator.body("address").trim().notEmpty(),
    expressValidator.body("phoneNumber").trim().notEmpty(),
    expressValidator.body("email").trim().notEmpty(),
    expressValidator.body("password").trim().notEmpty(),
  ],
  fileUpload.single("image"),
  authContoller.signup
);

router.post("/login", [expressValidator.body("username").trim().notEmpty(), expressValidator.body("password").trim().notEmpty()],authContoller.login);

module.exports = router;
