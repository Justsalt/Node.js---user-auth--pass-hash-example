const usersSchema = require("../schemas/userSchema");
const bcrypt = require("bcrypt");

module.exports = {
  Login: async (req, res) => {
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
};
