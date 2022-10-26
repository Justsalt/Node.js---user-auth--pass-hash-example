const sendRes = require("../modules/universalRes");
const usersSchema = require("../schemas/userSchema");

const { uid } = require("uid");
const bcrypt = require("bcrypt");

module.exports = {
  register: async (req, res) => {
    const { email, passwordOne: password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const createUser = await usersSchema({
      email,
      password: hash,
      secret: uid(),
    });
    createUser.save();

    res.status(200).send({ msg: "User Is Created" });
  },
};
