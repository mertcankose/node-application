const ProjectModel = require("../models/Project");

const BaseService = require("./BaseService");

class ProjectsService extends BaseService {
  model = ProjectModel;
}

module.exports = new ProjectsService();
