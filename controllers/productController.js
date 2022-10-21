const asyncHandler = require("express-async-handler");
const Products = require("../models/productModel");
const AppError = require("../utils/AppError");
const catchAsync = require('./../utils/catchAsync');

// Getting all products
// GET /api/products
// Public
const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Products.find();
  res
    .status(200)
    .json({ status: "success", result: products.length, data: products });
});


// Getting single products
// GET /api/products/:id
// Public 
const getProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const product = await Products.findById(id);
  if (!product) {
    // throw new Error("Product with specified ID not found");
    return next(new AppError("Product with specified ID not found", 404))
  }
  res.status(200).json({ status: "success", data: product });
});


// Create new Product
// POST /api/products
// Private
const createProduct = catchAsync(async (req, res, next) => {
  if (!req.body) {
    // throw new Error("Please fill in the appropraite fields.");
    return next(new AppError("Please fill in the appropraite fields.", 401))
  }
  const product = await Products.create(req.body);
  if (!product) {
    // throw new Error("Failed to create product");
    return  next(new AppError("Falied to create new Product", 401))

  }
  res.status(201).json({ status: "success", data: product });
});


// Update Single Product
// PATCH /api/products/:id
// Private
const updateProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  // Checking to see if the product to be updated exists.
  const product = await Products.findById(id);
  if (!product) {
    // throw new Error("Product with the specified id not found");
    return  next(new AppError("Product with the specified id not found", 401))

  }
  const updatedProduct = await Products.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedProduct) {
    // throw new Error("Failed to update product.");
    return  next(new AppError("Failed to update Product", 401))
  }
  res
    .status(201)
    .json({ status: "success", data: { product: updatedProduct } });
});



// Delete Single Product
// DELETE /api/products/:id
// Private
const deleteProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const product = await Products.findById(id);
  if (!product) {
    // throw new Error("Unable to delete product");
    return  next(new AppError("Product with the specified id not found - Unable to delete product", 401))
  }

  await Products.findByIdAndDelete(id);
  res.status(200).json({ status: "success" });
});



// Get a single Product using the slug
// GET /api/products/:slug
// Public
const getProductBySlug = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;
  const product = await Products.find({ slug: slug });
  if (!product) {
    // throw new Error("Can't find product with the specified slug");
    return  next(new AppError("Can't find product with the specified slug product", 401))

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
