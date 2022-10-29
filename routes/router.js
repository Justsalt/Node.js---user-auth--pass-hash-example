const express = require("express");
const router = express.Router();
const { passwordValidator } = require("../midleware/passwordValidator");
const { emailValid } = require("../midleware/EmailValidator");
const { profileValid } = require("../midleware/ProfileValidator");
const { postValidator } = require("../midleware/CreatingPostValidator");
const {
  register,
  login,
  logOut,
  userDataExtra,
  userDataGet,
  postCategory,
  getAllCreatedPosts,
  getUserPost,
} = require("../controllers/MainController");

router.post("/register", emailValid, passwordValidator, register);
router.post("/login", login);
router.get("/logOut", logOut);
router.post("/userData", profileValid, userDataExtra);
router.get("/userDataGet", userDataGet);
router.post("/categoryPost", postValidator, postCategory);
router.get("/getAllPosts", getAllCreatedPosts);
router.get("/userPost", getUserPost);

module.exports = router;

// vista@gmail.com
// aaaaaaaa12B
