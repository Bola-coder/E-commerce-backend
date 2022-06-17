const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Product should have a name"],
    trim: true,
    minlength: [
      5,
      "A product name should have a minimum length of 5 characters",
    ],
    maxLength: [
      20,
      "A product name should have a maximum length of 20 characters",
    ],
  },
  price: {
    type: Number,
    required: [true, "A product should have a price"],
  },
  discountPrice: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: "The discount price should be lesser than the price",
    },
  },
  description: {
    type: String,
    required: [true, "Product should have a breif description"],
    trim: true,
  },
  isAvailable: {
    type: Boolean,
    defualt: true,
  },
  thumbnail: {
    type: String,
    required: [true, "An image should have a valid thumbnail"],
  },
  images: {
    type: [String],
  },
  slug: {
    type: String,
  },
});

// A document middleware to create slugs using product names
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Products = mongoose.model("Products", productSchema);

module.exports = Products;