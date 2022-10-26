const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
  },
});

const exportUser = mongoose.model("Register-User", userSchema);

module.exports = exportUser;
