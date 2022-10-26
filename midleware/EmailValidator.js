const isEmail = require("is-email");
const userSchema = require("../schemas/userSchema");

module.exports = {
  emailValid: async (req, res, next) => {
    const { email } = req.body;
    if (!isEmail(email))
      return res.status(400).send({ msg: "The email address is not valid!" });

    const userExists = await userSchema.findOne({ email });
    if (userExists) {
      return res.status(400).send({ msg: "Email Already Exits" });
    }
    next();
  },
};
