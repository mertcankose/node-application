const BaseLogger = require("./BaseLogger");

class SectionsLogger extends BaseLogger {
  constructor() {
    super("sections-service", "v1/src/logs/sections");
  }
}

module.exports = new SectionsLogger();
