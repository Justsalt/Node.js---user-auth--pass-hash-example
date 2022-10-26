const express = require("express");
const router = express.Router();
const { passwordValidator } = require("../midleware/passwordValidator");
const { emailValid } = require("../midleware/EmailValidator");
const { register } = require("../controllers/createUser");
const { login } = require("../controllers/login");
const { isAuth } = require("../midleware/cookies");

router.post("/register", emailValid, passwordValidator, register);
router.post("/login", isAuth, login);

module.exports = router;

// vista@gmail.com
// aaaaaaaa12B
