const ErrorResponse = require("../utility/ErrorResponse");

exports.errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  console.log(err.stack.red);
  if (err.name === "CastError") {
    const message = "user does not exist";
    error = new ErrorResponse(message, 404);
  }
  res.status(error.statusCode || 500).json({
    error: error.message || "Server Error",
  });
};
