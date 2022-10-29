const isImageURL = require("image-url-validator").default;
module.exports = {
  postValidator: async (req, res, next) => {
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
      photoFive,
      condition,
    } = req.body;
    const isValidUrlOne = await isImageURL(photoOne);
    const isValidUrlTwo = await isImageURL(photoTwo);
    const isValidUrlThree = await isImageURL(photoThree);
    const isValidUrlFour = await isImageURL(photoFour);
    const isValidUrlFive = await isImageURL(photoFive);
    if (title.length <= 1) {
      return res.status(400).send({
        msg: "Skelbimo Antraštė turi būti ilgesne nei vienas simbolis.!",
      });
    }
    if (!price) {
      return res.status(400).send({
        msg: "kaina nebuvo nurodyta!",
      });
    }
    if (description.length < 1 || description.length >= 125) {
      return res.status(400).send({
        msg: "Aprašymas turi būti ilgesnis nei vienas simbolis ir trumpesnis nei 125 simboliai.!",
      });
    }
    if (!searchingOrOffer) {
      return res.status(400).send({
        msg: "Nebuvo pasirinktas laukas, Siūlau - Ieškau!",
      });
    }
    if (!isValidUrlOne) {
      return res
        .status(400)
        .send({ msg: "Nuotrauka (1) turi prasidėti su HTTP" });
    }
    if (photoTwo) {
      if (!isValidUrlTwo) {
        return res
          .status(400)
          .send({ msg: "Nuotrauka (2) turi prasidėti su HTTP" });
      }
    }
    if (photoThree) {
      if (!isValidUrlThree) {
        return res
          .status(400)
          .send({ msg: "Nuotrauka (3) turi prasidėti su HTTP" });
      }
    }
    if (photoFour) {
      if (!isValidUrlFour) {
        return res
          .status(400)
          .send({ msg: "Nuotrauka (4) turi prasidėti su HTTP" });
      }
    }
  },
};
