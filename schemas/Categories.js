const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Categories = new Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  searchingOrOffer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  photo: {
    photoList: [],
  },
  condition: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

const exoportCategories = mongoose.model("Post-Categories", Categories);

module.exports = exoportCategories;
