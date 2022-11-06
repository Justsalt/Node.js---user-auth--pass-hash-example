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
  getFindAndDeletePost,
  EditUserPost,
  GetLimitedCreatedPosts,
  SingleUserPost,
  GetPostsByCategory,
  FilterPosts,
  characterSearch,
} = require("../controllers/MainController");

router.post("/register", emailValid, passwordValidator, register);
router.post("/login", login);
router.get("/logOut", logOut);
router.post("/userData", profileValid, userDataExtra);
router.get("/userDataGet", userDataGet);
router.post("/categoryPost", postValidator, postCategory);
router.get("/getAllPosts", getAllCreatedPosts);
router.get("/userPost", getUserPost);
router.get("/deletePost/:id", getFindAndDeletePost);
router.post("/editActivePost", postValidator, EditUserPost);
router.get("/getLimitedCreatedPosts", GetLimitedCreatedPosts);
router.get("/singleUserPost/:id", SingleUserPost);
router.get("/categoryPosts/:categoryName", GetPostsByCategory);
router.post("/filterPost", FilterPosts);
router.get("/searchInput/:character", characterSearch);

module.exports = router;
