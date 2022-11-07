const categoriesPostSchema = require("../schemas/Categories");

module.exports = {
  characterSearch: async (req, res) => {
    const { character } = req.params;
    const searchByCharacter = await categoriesPostSchema.find({
      title: { $regex: new RegExp("^" + character + ".*", "i") },
    });
    return res.status(200).send({
      msg: "Ieskomas",
      search: searchByCharacter,
    });
  },
};
