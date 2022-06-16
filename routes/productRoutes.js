const express = require("express");
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateeProduct,
  deleteProduct,
} = require("./../comtrollers/productController");
const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);

router
  .route("/:id")
  .get(getProduct)
  .patch(updateeProduct)
  .delete(deleteProduct);

module.exports = router;
