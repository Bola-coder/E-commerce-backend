const asyncHandler = require("express-async-handler");

// Getting all products
// GET /api/products
// Public
getAllProducts = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: "Getting all products" });
});

getProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: "Getting a product" });
});

createProduct = asyncHandler(async (req, res) => {
  res.status(201).json({ status: "success", data: "Created new product" });
});

updateeProduct = asyncHandler(async (req, res) => {
  res.status(201).json({ status: "success", data: "Updated product" });
});

deleteProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: "Deleted product" });
});

const controllers = {
  getAllProducts,
  getProduct,
  createProduct,
  updateeProduct,
  deleteProduct,
};
module.exports = controllers;
