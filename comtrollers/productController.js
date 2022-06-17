const asyncHandler = require("express-async-handler");
const { update } = require("./../models/productModel");
const Products = require("./../models/productModel");

// Getting all products
// GET /api/products
// Public
getAllProducts = asyncHandler(async (req, res) => {
  const products = await Products.find();
  res
    .status(200)
    .json({ status: "success", result: products.length, data: products });
});

// Getting single products
// GET /api/products/:id
// Public
getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.status(200).json({ status: "success", data: product });
});

// Create new Product
// POST /api/products
// Private
createProduct = asyncHandler(async (req, res) => {
  if (!req.body) {
    throw new Error("Please fill in the appropraite fields.");
  }
  const product = await Products.create(req.body);
  if (!product) {
    throw new Error("Failed to create product");
  }
  res.status(201).json({ status: "success", data: product });
});

// Update Single Product
// PATCH /api/products/:id
// Private
updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updatedProduct = await Products.findByIdAndUpdate(id, req.body, {
    runValidators: true,
  });
  if (!updatedProduct) {
    throw new Error("Failed to update product.");
  }
  res
    .status(201)
    .json({ status: "success", data: { product: updatedProduct } });
});

// Delete Single Product
// DELETE /api/products/:id
// Private
deleteProduct = asyncHandler(async (req, res) => {
  res.status(200).json({ status: "success", data: "Deleted product" });
});

const controllers = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
module.exports = controllers;
