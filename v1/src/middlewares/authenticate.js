const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const throwError = require("../scripts/errors/throwError");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Bearer `${token}`

  if (!token) throwError("Unauthorized", httpStatus.UNAUTHORIZED);

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
    if (err) throwError("Unauthorized", httpStatus.UNAUTHORIZED);

    req.user = user;
    next();
  });
};

module.exports = authenticate;
