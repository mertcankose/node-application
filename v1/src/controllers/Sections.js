const httpStatus = require("http-status");
const SectionsService = require("../services/SectionsService");
const BaseController = require("./BaseController");

class SectionsController extends BaseController {
  service = SectionsService;

  async listProjectSections(req, res, next) {
    if (!req.params.projectId) return res.status(httpStatus.BAD_REQUEST).send({ message: "Project id is required" });

    try {
      let response = await this.service.list({ project: req.params.projectId });
      res.status(httpStatus.OK).send(response);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    if (!req.params.projectId) return res.status(httpStatus.BAD_REQUEST).send({ message: "Project id is required" });

    req.body.user = req.user;
    req.body.project = req.params.projectId;

    try {
      let response = await this.service.insert(req.body);
      res.status(httpStatus.CREATED).send(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new SectionsController();
