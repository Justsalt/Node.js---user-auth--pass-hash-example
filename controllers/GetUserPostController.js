const categoriesPostSchema = require("../schemas/Categories");

module.exports = {
  GetUserPost: async (req, res) => {
    const { email: userEmail } = req.session;
    const userPost = await categoriesPostSchema.find({ user: userEmail });

    return res.status(200).send({
      msg: "Rasti Visi Userio Postai",
      post: userPost,
    });
  },
};
