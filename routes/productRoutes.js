const express = require("express");
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug,
} = require("../controllers/productController");
const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);

router.route("/:id").get(getProduct).patch(updateProduct).delete(deleteProduct);

router.route("/slug/:slug").get(getProductBySlug);

module.exports = router;
