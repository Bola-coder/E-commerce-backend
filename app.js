const express = require("express");
const morgan = require("morgan");
const productRoutes = require("./routes/productRoutes");
const globalErrorHandler = require("./middlewares/errorHandler");
const AppError = require("./utils/AppError");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);


app.use('*', (req, res, next) => {
  const error = new AppError(`Cant find ${req.originalUrl} on this server`, 404);
  next(error)
})

app.use(globalErrorHandler);


module.exports = app;
