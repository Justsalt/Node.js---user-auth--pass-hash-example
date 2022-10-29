const isImageURL = require("image-url-validator").default;
module.exports = {
  postValidator: async (req, res, next) => {
    const {
      category,
      title,
      searchingOrOffer,
      description,
      price,
      photo,
      condition,
    } = req.body;
    const isValidUrl = await isImageURL(photo);
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
    if (!isValidUrl) {
      return res.status(400).send({ msg: "Nuotrauka turi prasidėti su HTTP" });
    }
  },
};
