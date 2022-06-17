const handdleError = async (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);

  res.json({
    message: err.message,
    statck: process.env.NODE_ENV === "production" ? "" : err.stack,
  });
};

module.exports = {
  handdleError,
};
