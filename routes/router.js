const express = require("express");
const router = express.Router();
const { passwordValidator } = require("../midleware/passwordValidator");
const { emailValid } = require("../midleware/EmailValidator");
const { profileValid } = require("../midleware/ProfileValidator");
const { postValidator } = require("../midleware/CreatingPostValidator");

const { register } = require("../controllers/RegisterController");
const { Login } = require("../controllers/LoginController");
const { LogOut } = require("../controllers/LogOutController");
const { UserDataExtra } = require("../controllers/UserDataExtraController");
const { UserDataGet } = require("../controllers/UserDataGetController");
const { PostCategory } = require("../controllers/PostCategory");
const { GetUserPost } = require("../controllers/GetUserPostController");
const { GetAllCreatedPosts } = require("../controllers/GetAllCreatedPosts");
const { GetFindAndDeletePost } = require("../controllers/GetFindAndDeletePost");
const { EditUserPost } = require("../controllers/EditUserPost");
const { SingleUserPost } = require("../controllers/SingleUserPost");
const {
  GetLimitedCreatedPosts,
} = require("../controllers/GetLimitedCreatedPosts");
const {
  GetPostsByCategory,
  FilterPosts,
} = require("../controllers/FilterPosts/Filter");
const { characterSearch } = require("../controllers/CharacterSearch");

router.post("/register", emailValid, passwordValidator, register);
router.post("/login", Login);
router.get("/logOut", LogOut);
router.post("/userData", profileValid, UserDataExtra);
router.get("/userDataGet", UserDataGet);
router.post("/categoryPost", postValidator, PostCategory);
router.get("/getAllPosts", GetAllCreatedPosts);
router.get("/userPost", GetUserPost);
router.get("/deletePost/:id", GetFindAndDeletePost);
router.post("/editActivePost", postValidator, EditUserPost);
router.get("/getLimitedCreatedPosts", GetLimitedCreatedPosts);
router.get("/singleUserPost/:id", SingleUserPost);
router.get("/categoryPosts/:categoryName", GetPostsByCategory);
router.post("/filterPost", FilterPosts);
router.get("/searchInput/:character", characterSearch);

module.exports = router;
