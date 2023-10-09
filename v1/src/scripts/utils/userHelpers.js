const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const passwordToHash = (password) => {
  let secretSalt = CryptoJS.HmacSHA1(password, process.env.PASSWORD_SECRET).toString();
  return CryptoJS.HmacSHA256(password, secretSalt).toString();
};

const generateAccessToken = (user) => {
  return jwt.sign(user.toObject(), process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "1w",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user.toObject(), process.env.REFRESH_TOKEN_KEY, {
    expiresIn: "15m",
  });
};

module.exports = {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
};
