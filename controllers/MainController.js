const usersSchema = require("../schemas/userSchema");
const categoriesPostSchema = require("../schemas/Categories");
const bcrypt = require("bcrypt");
const session = require("express-session");

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
    console.log(updateExistUser);

    return res.status(200).send({
      msg: "Atnaujinti Duomenys!",
      user: updateExistUser,
    });
  },
  userDataGet: async (req, res) => {
    const { email } = req.session;
    const userData = await usersSchema.find({ email });
    console.log(userData);
    return res.status(200).send({
      msg: "You have updated your profile info!",
      user: userData,
    });
  },
  postCategory: async (req, res) => {
    const {
      category,
      title,
      searchingOrOffer,
      description,
      price,
      photo,
      condition,
    } = req.body;
    console.log(category);
    console.log(title);
    console.log(searchingOrOffer);
    console.log(description);
    console.log(price);
    console.log(photo);
    console.log(condition);
    return res.status(200).send({
      msg: "Category Is Created",
    });
  },
};
