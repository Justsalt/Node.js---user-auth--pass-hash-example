module.exports = {
  passwordValidator: (req, res, next) => {
    const { passwordOne, passwordSecond } = req.body;

    if (passwordOne.length < 6) {
      return res
        .status(400)
        .send({ msg: "Passwords must be at least 6 characters long!" });
    }

    let hasLowerCase = false;
    let hasUpperCase = false;
    let hasNumber = false;

    passwordOne.split("").forEach((char) => {
      if (char === char.toLowerCase() && isNaN(Number(char))) {
        hasLowerCase = true;
      }

      if (char === char.toUpperCase() && isNaN(Number(char))) {
        hasUpperCase = true;
      }

      if (!isNaN(Number(char))) {
        hasNumber = true;
      }
    });

    if (!hasLowerCase) {
      return res
        .status(400)
        .send({ msg: "Password should have at least one lowercase letter!" });
    }

    if (!hasUpperCase) {
      return res
        .status(400)
        .send({ msg: "Password should have at least one uppercase letter!" });
    }

    if (!hasNumber) {
      return res
        .status(400)
        .send({ msg: "Password should have at least one number!" });
    }

    if (passwordOne !== passwordSecond) {
      return res.status(400).send({ msg: "Passwords do not match!" });
    }

    next();
  },
};
// export default passwordValidator;
