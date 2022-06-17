const express = require("express");
const morgan = require("morgan");
const productRoutes = require("./routes/productRoutes");
const { handdleError } = require("./middlewares/errorHandler");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);

app.use(handdleError);

module.exports = app;
