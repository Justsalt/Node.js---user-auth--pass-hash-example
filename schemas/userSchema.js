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
  name: {
    type: String,
    required: false,
  },
  surname: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  privateOrUab: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: false,
    default:
      "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png",
  },
  date: {
    type: String,
    default: Date.now,
  },
});

const exportUser = mongoose.model("Register-User", userSchema);

module.exports = exportUser;
