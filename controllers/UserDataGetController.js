const usersSchema = require("../schemas/userSchema");

module.exports = {
  UserDataGet: async (req, res) => {
    const { email } = req.session;
    const userData = await usersSchema.find({ email });

    return res.status(200).send({
      msg: "You have updated your profile info!",
      user: userData,
    });
  },
};
