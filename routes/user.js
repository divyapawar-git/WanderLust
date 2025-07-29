const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

// user signup
router.route("/signup")
      .get(userController.renderSignupForm)
      .post(wrapAsync(userController.signup));

// user login
router.route("/login")
      .get(userController.renderLoginForm)
      .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.login);

// user logout
router.get("/logout", userController.logout);

module.exports = router;