const httpStatus = require("http-status");

const errorHandler = (error, req, res, next) => {
  const errorStatus = error.statusCode || error.status || httpStatus.INTERNAL_SERVER_ERROR;
  const errorMessage = error.message || error;

  res.status(errorStatus).json({
    error: true,
    status: errorStatus,
    message: errorMessage,
    stack: process.env.NODE_ENV === "development" ? error.stack : {},
  });
};

module.exports = errorHandler;
