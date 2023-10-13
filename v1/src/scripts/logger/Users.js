const BaseLogger = require("./BaseLogger");

class UsersLogger extends BaseLogger {
  constructor() {
    super("users-service", "v1/src/logs/users");
  }
}

module.exports = new UsersLogger();
