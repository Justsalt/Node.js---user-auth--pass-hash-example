const usersSchema = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
// const session = require("express-sessio

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
};
