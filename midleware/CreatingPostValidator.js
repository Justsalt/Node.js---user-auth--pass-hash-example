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

      condition,
    } = req.body;
    const isValidUrlOne = await isImageURL(photoOne);
    const isValidUrlTwo = await isImageURL(photoTwo);
    const isValidUrlThree = await isImageURL(photoThree);
    const isValidUrlFour = await isImageURL(photoFour);

    if (title.length < 1 || title.length >= 20) {
      return res.status(400).send({
        msg: "Skelbimo Antraštė turi būti tarp 1-20 simbolių,.!",
      });
    }
    if (price.length < 1 || price.length > 9) {
      return res.status(400).send({
        msg: "Maksimali kaina yra 9 Skaičių.",
      });
    }
    if (description.length < 1 || description.length >= 125) {
      return res.status(400).send({
        msg: "Aprašymas turi būti tarp 1 ir 125 simbolių.!",
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
    next();
  },
};
