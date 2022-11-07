const categoriesPostSchema = require("../schemas/Categories");

module.exports = {
  EditUserPost: async (req, res) => {
    const photoArr = [];
    const {
      category,
      title,
      searchingOrOffer,
      description,
      price,
      photoOne,
      photoTwo,
      photoThree,
      photoFour,
      condition,
      userId,
    } = req.body;

    if (photoOne) {
      photoArr.push(photoOne);
    }
    if (photoTwo) {
      photoArr.push(photoTwo);
    }
    if (photoThree) {
      photoArr.push(photoThree);
    }
    if (photoFour) {
      photoArr.push(photoFour);
    }

    const updateExsitPost = await categoriesPostSchema.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          category,
          title,
          searchingOrOffer,
          description,
          price,
          photo: {
            photoList: photoArr,
          },
          condition,
          user: req.session.email,
          postId: req.session.postId,
        },
      },
      { new: true }
    );

    return res.status(200).send({
      msg: "Atnaujinti Posto Duomenys!",
      userPost: updateExsitPost,
    });
  },
};
