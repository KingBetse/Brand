const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "product must have a name"],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "product must have a price"],
  },
  description: {
    type: String,
    required: [true, "product must have a description"],
  },
  image: {
    type: String,
    required: [true, "product must have a image"],
  },
  category: {
    type: String,
    required: [true, "product must have a catagory"],
    enum: {
      values: ["men's clothing", "women's clothing", "electronics", "jewelery"],
      message:
        "The Catagory must be men's clothing,women's clothing, electronics, jewelerys",
    },
  },
});
const product = mongoose.model("product", productSchema);

module.exports = product;
