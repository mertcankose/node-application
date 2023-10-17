const ProjectsService = require("../services/ProjectsService");
const BaseController = require("./BaseController");

class ProjectsController extends BaseController {
  service = ProjectsService;
}

module.exports = new ProjectsController();
