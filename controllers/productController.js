const asyncHandler = require("express-async-handler");
const Products = require("../models/productModel");

// Getting all products
// GET /api/products
// Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Products.find();
  res
    .status(200)
    .json({ status: "success", result: products.length, data: products });
});

// Getting single products
// GET /api/products/:id
// Public
const getProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Products.findById(id);
  if (!product) {
    throw new Error("Product with specified ID not found");
  }
  res.status(200).json({ status: "success", data: product });
});

// Create new Product
// POST /api/products
// Private
const createProduct = asyncHandler(async (req, res) => {
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
const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // Checking to see if the product to be updated exists.
  const product = await Products.findById(id);
  if (!product) {
    throw new Error("Product with the specified id not found");
  }
  const updatedProduct = await Products.findByIdAndUpdate(id, req.body, {
    new: true,
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
const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Products.findById(id);
  if (!product) {
    throw new Error("Unable to delete product");
  }

  await Products.findByIdAndDelete(id);
  res.status(200).json({ status: "success" });
});

// Get a single Product using the slug
// GET /api/products/:slug
// Public
const getProductBySlug = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const product = await Products.find({ slug: slug });
  if (!product) {
    throw new Error("Can't find product with the specified slug");
  }
  res.status(200).json({ status: "success", data: product });
});

const controllers = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug,
};
module.exports = controllers;
