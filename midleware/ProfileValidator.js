const isImageURL = require("image-url-validator").default;
module.exports = {
  profileValid: async (req, res, next) => {
    const {
      name,
      surname,
      phone: tel,
      city,
      privateOrUab,
      address,
      photo,
    } = req.body;
    const isValidUrl = await isImageURL(photo);

    if (!name.length > 0 || !name.length <= 20) {
      return res
        .status(400)
        .send({ msg: "Vardas turi buti tarp 1 ir 20 simbolių!" });
    }
    if (!surname.length > 0) {
      return res
        .status(400)
        .send({ msg: "Pavardė turi buti ilgesnis nei viena raidė.!" });
    }
    if (
      (tel.startsWith(370) && Number(tel.length) === 11) ||
      (tel.startsWith(+370) && Number(tel.length) === 12) ||
      (tel.startsWith(86) && Number(tel.length) === 9)
    ) {
    } else {
      return res
        .status(400)
        .send({ msg: "Telefono numeris turi prasidėti +370 arba 86 !" });
    }

    if (!address.length > 0) {
      return res
        .status(400)
        .send({ msg: "Adresas turi buti ilgesnis nei viena raidė.!" });
    }

    if (!isValidUrl) {
      return res.status(400).send({ msg: "Nuotrauka turi prasidėti su HTTP" });
    }
    if (!privateOrUab) {
      return res.status(400).send({ msg: "Pasirinkite asmens tipą." });
    }
    next();
  },
};
