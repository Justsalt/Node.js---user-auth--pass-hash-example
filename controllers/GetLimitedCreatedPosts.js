const usersSchema = require("../schemas/userSchema");
const categoriesPostSchema = require("../schemas/Categories");

module.exports = {
  GetLimitedCreatedPosts: async (req, res) => {
    const newPosts = await categoriesPostSchema
      .find()
      .limit(4)
      .sort({ $natural: -1 });
    const allPosts = await categoriesPostSchema.aggregate([
      { $sample: { size: 18 } },
    ]);

    return res.status(200).send({
      msg: "Naujausi Sukurti Postai",
      newPost: newPosts,
      allNewPosts: allPosts,
    });
  },
};
