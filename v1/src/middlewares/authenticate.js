const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1]; // Bearer `${token}`

  if (!token) return res.status(httpStatus.UNAUTHORIZED).send({ message: "Unauthorized" });

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
    if (err) return res.status(httpStatus.FORBIDDEN).send({ message: "Forbidden" }); // token süresi geçmiş

    req.user = user;
    next();
  });
};

module.exports = authenticate;
