const categoriesPostSchema = require("../schemas/Categories");

module.exports = {
  PostCategory: async (req, res) => {
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

    const createPost = await categoriesPostSchema({
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
    });
    createPost.save();

    return res.status(200).send({
      msg: "Skelbimas Sekmingai Įdėtas",
      post: createPost,
    });
  },
};
