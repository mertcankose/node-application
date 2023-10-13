const BaseLogger = require("./BaseLogger");

class ProjectsLogger extends BaseLogger {
  constructor() {
    super("projects-service", "v1/src/logs/projects");
  }
}

module.exports = new ProjectsLogger();
