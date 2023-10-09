const winston = require("winston");

const projectsLogger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "projects-service" },
  transports: [
    new winston.transports.File({
      filename: "v1/src/logs/projects/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "v1/src/logs/projects/info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "v1/src/logs/projects/combined.log",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  projectsLogger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

module.exports = projectsLogger;
