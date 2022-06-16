const asyncHandler = require("express-async-handler");

// Getting all products
// GET /api/products
// Public
getAllProducts = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: "Getting all products" });
});

const controllers = {
  getAllProducts,
};
module.exports = controllers;
