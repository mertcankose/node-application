const throwError = require("../scripts/errors/throwError");
const httpStatus = require("http-status");

const idChecker = (field) => (req, res, next) => {
  const idField = field || "id";

  if (!req?.params[idField]?.match(/^[0-9a-fA-F]{24}$/)) {
    throwError("Id is not valid", httpStatus.BAD_REQUEST);
  }
  next();
};

module.exports = idChecker;
