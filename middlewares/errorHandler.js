const AppError = require('./../utils/AppError');

// const handdleError = async (err, req, res, next) => {
//   const statusCode = res.statusCode ? res.statusCode : 500;
//   res.status(statusCode);

//   res.json({
//     message: err.message,
//     statck: process.env.NODE_ENV === "production" ? "" : err.stack,
//   });
// };

// module.exports = {
//   handdleError,
// };


module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // 500 is internal server error
  err.status = err.status || 'error'; // error is the status for 500 codes

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

  next();
}