const categoriesPostSchema = require("../schemas/Categories");

module.exports = {
  GetAllCreatedPosts: async (req, res) => {
    const allPosts = await categoriesPostSchema.find();
    return res.status(200).send({
      msg: "Rasti Visi Postai",
      posts: allPosts,
    });
  },
};
