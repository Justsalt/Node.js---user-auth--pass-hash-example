const usersSchema = require("../schemas/userSchema");
const categoriesPostSchema = require("../schemas/Categories");
const bcrypt = require("bcrypt");
const session = require("express-session");
const ITEMS_PER_PAGE = 3;
module.exports = {
  register: async (req, res) => {
    const { email, passwordOne: password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const createUser = await usersSchema({
      email,
      password: hash,
    });
    createUser.save();

    res.status(200).send({ msg: "User Is Created" });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const userExists = await usersSchema.findOne({ email });
    if (userExists) {
      const compare = await bcrypt.compare(password, userExists.password);

      if (compare) {
        req.session.email = email;

        res

          .status(200)
          .send({ msg: "Signed in successfully!", secret: userExists.secret });
      } else {
        return res.status(400).send({
          msg: "Invalid credentials or password requirements not met!",
        });
      }
    } else {
      return res
        .status(400)
        .send({ msg: "Invalid credentials or password requirements not met!" });
    }
  },
  logOut: async (req, res) => {
    req.session.email = null;
    return res.status(200).send({ msg: "You have been logged out" });
  },

  userDataExtra: async (req, res) => {
    const { name, surname, phone, city, privateOrUab, address, photo } =
      req.body;

    const { email } = req.session;

    const updateExistUser = await usersSchema.findOneAndUpdate(
      { email: email },
      {
        $set: {
          name,
          surname,
          phone,
          email,
          city,
          privateOrUab,
          address,
          photo,
        },
      },
      { new: true }
    );

    return res.status(200).send({
      msg: "Atnaujinti Duomenys!",
      user: updateExistUser,
    });
  },
  userDataGet: async (req, res) => {
    const { email } = req.session;
    const userData = await usersSchema.find({ email });

    return res.status(200).send({
      msg: "You have updated your profile info!",
      user: userData,
    });
  },
  postCategory: async (req, res) => {
    const photoArr = [];

    const {
      category,
      title,
      searchingOrOffer,
      description,
      price,
      photoOne,
      photoTwo,
      photoThree,
      photoFour,

      condition,
    } = req.body;

    if (photoOne) {
      photoArr.push(photoOne);
    }
    if (photoTwo) {
      photoArr.push(photoTwo);
    }
    if (photoThree) {
      photoArr.push(photoThree);
    }
    if (photoFour) {
      photoArr.push(photoFour);
    }

    const createPost = await categoriesPostSchema({
      category,
      title,
      searchingOrOffer,
      description,
      price,
      photo: {
        photoList: photoArr,
      },
      condition,
      user: req.session.email,
      postId: req.session.postId,
    });
    createPost.save();

    return res.status(200).send({
      msg: "Skelbimas Sekmingai Įdėtas",
      post: createPost,
    });
  },
  getUserPost: async (req, res) => {
    const { email: userEmail } = req.session;
    const userPost = await categoriesPostSchema.find({ user: userEmail });

    return res.status(200).send({
      msg: "Rasti Visi Userio Postai",
      post: userPost,
    });
  },
  getAllCreatedPosts: async (req, res) => {
    const allPosts = await categoriesPostSchema.find();
    return res.status(200).send({
      msg: "Rasti Visi Postai",
      posts: allPosts,
    });
  },
  getFindAndDeletePost: async (req, res) => {
    const { id } = req.params;

    const post = await categoriesPostSchema.findOneAndDelete({
      _id: id,
    });
    return res.status(200).send({
      msg: "Ištintas Postas",
    });
  },
  EditUserPost: async (req, res) => {
    const photoArr = [];
    const {
      category,
      title,
      searchingOrOffer,
      description,
      price,
      photoOne,
      photoTwo,
      photoThree,
      photoFour,
      condition,
      userId,
    } = req.body;

    if (photoOne) {
      photoArr.push(photoOne);
    }
    if (photoTwo) {
      photoArr.push(photoTwo);
    }
    if (photoThree) {
      photoArr.push(photoThree);
    }
    if (photoFour) {
      photoArr.push(photoFour);
    }

    const updateExsitPost = await categoriesPostSchema.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          category,
          title,
          searchingOrOffer,
          description,
          price,
          photo: {
            photoList: photoArr,
          },
          condition,
          user: req.session.email,
          postId: req.session.postId,
        },
      },
      { new: true }
    );

    return res.status(200).send({
      msg: "Atnaujinti Posto Duomenys!",
      userPost: updateExsitPost,
    });
  },
  GetLimitedCreatedPosts: async (req, res) => {
    const newPosts = await categoriesPostSchema
      .find()
      .limit(4)
      .sort({ $natural: -1 });
    const allPosts = await categoriesPostSchema.aggregate([
      { $sample: { size: 18 } },
    ]);

    return res.status(200).send({
      msg: "Naujausi Sukurti Postai",
      newPost: newPosts,
      allNewPosts: allPosts,
    });
  },

  SingleUserPost: async (req, res) => {
    const { id } = req.params;
    // const postAndUserInfo=[]
    const userPost = await categoriesPostSchema.find({ _id: id });

    const userInformation = await usersSchema.find({ email: userPost[0].user });

    return res.status(200).send({
      msg: "Rastas Useris Ir Jo Postas",
      post: userPost,
      user: userInformation,
    });
  },

  GetPostsByCategory: async (req, res) => {
    const { categoryName } = req.params;
    const maxValue = await categoriesPostSchema
      .find({
        category:
          categoryName === "allCategories"
            ? [
                "transport",
                "realEsate",
                "job",
                "houseHold",
                "computer",
                "machinery",
              ]
            : categoryName,
      })
      .sort({ price: 1 })
      .select("price");

    const page = req.query.page || 1;
    const query = {
      category:
        categoryName === "allCategories"
          ? [
              "transport",
              "realEsate",
              "job",
              "houseHold",
              "computer",
              "machinery",
            ]
          : categoryName,
    };
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const count = await categoriesPostSchema.find(query);
    const countLength = count.length;
    const CategoryPost = await categoriesPostSchema
      .find(query)
      .skip(skip)
      .limit(3);

    // .skip(page * booksPerPage).limit(booksPerPage)
    const pageCount = countLength / ITEMS_PER_PAGE;

    return res.status(200).send({
      pagination: {
        countLength,
        pageCount,
      },
      msg: "Rastas Postas Pagal Kategorija",
      post: CategoryPost,
      price: maxValue,
    });
  },
  FilterPosts: async (req, res) => {
    const { priceOne, priceTwo, searchingOrOffer, condition, categoryName } =
      req.body;
    console.log(categoryName);
    console.log(priceTwo);
    console.log(condition);
    console.log(searchingOrOffer);
    const CategoryPostFilter = await categoriesPostSchema
      .find({
        price: { $gte: Number(priceOne), $lte: Number(priceTwo) },
        searchingOrOffer:
          searchingOrOffer === "all"
            ? ["searching", "offer"]
            : searchingOrOffer,
        condition: condition === "all" ? ["new", "used"] : condition,
        category:
          categoryName === "allCategories"
            ? [
                "transport",
                "realEsate",
                "job",
                "houseHold",
                "computer",
                "machinery",
              ]
            : categoryName,
      })
      .limit(3);
    console.log(CategoryPostFilter);
    return res.status(200).send({
      msg: "Atfiltruoti Postai",
      post: CategoryPostFilter,
    });
  },
  characterSearch: async (req, res) => {
    const { character } = req.params;
    const searchByCharacter = await categoriesPostSchema.find({
      title: { $regex: new RegExp("^" + character + ".*", "i") },
    });
    return res.status(200).send({
      msg: "Ieskomas",
      search: searchByCharacter,
    });
  },
};
