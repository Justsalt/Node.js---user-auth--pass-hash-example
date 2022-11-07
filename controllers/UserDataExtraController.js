const usersSchema = require("../schemas/userSchema");

module.exports = {
  UserDataExtra: async (req, res) => {
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
};
