const winston = require("winston");

class BaseLogger {
  constructor(serviceName, logFileName) {
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.json(),
      defaultMeta: { service: serviceName },
      transports: [
        new winston.transports.File({
          filename: logFileName + "/error.log",
          level: "error",
        }),
        new winston.transports.File({
          filename: logFileName + "/info.log",
          level: "info",
        }),
        new winston.transports.File({
          filename: logFileName + "/combined.log",
        }),
      ],
    });

    if (process.env.NODE_ENV !== "production") {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        })
      );
    }
  }

  log(type, message, level = "info") {
    this.logger.log(level, { type, message });
  }

  error(type, message) {
    this.log(type, message, "error");
  }
}

module.exports = BaseLogger;
