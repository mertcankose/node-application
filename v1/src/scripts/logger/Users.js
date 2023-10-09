const winston = require("winston");

const usersLogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "users-service" },
  transports: [
    new winston.transports.File({
      filename: "v1/src/logs/users/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "v1/src/logs/users/info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "v1/src/logs/users/combined.log",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  usersLogger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = usersLogger;
