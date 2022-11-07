const categoriesPostSchema = require("../schemas/Categories");

module.exports = {
  GetFindAndDeletePost: async (req, res) => {
    const { id } = req.params;

    const post = await categoriesPostSchema.findOneAndDelete({
      _id: id,
    });
    return res.status(200).send({
      msg: "Ištintas Postas",
    });
  },
};
