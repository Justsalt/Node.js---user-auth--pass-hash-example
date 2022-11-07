const usersSchema = require("../schemas/userSchema");
const categoriesPostSchema = require("../schemas/Categories");

module.exports = {
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
};
