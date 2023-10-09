const dotenv = require("dotenv");

module.exports = () => {
  dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });
};
