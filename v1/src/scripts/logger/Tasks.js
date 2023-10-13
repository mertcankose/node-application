const BaseLogger = require("./BaseLogger");

class TasksLogger extends BaseLogger {
  constructor() {
    super("tasks-service", "v1/src/logs/tasks");
  }
}

module.exports = new TasksLogger();
