module.exports = {
  LogOut: async (req, res) => {
    req.session.email = null;
    return res.status(200).send({ msg: "You have been logged out" });
  },
};
