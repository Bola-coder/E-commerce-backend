const express = require("express");
const { getAllProducts } = require("./../comtrollers/productController");
const router = express.Router();

router.get("/", getAllProducts);

module.exports = router;
