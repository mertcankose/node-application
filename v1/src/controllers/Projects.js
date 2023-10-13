const httpStatus = require("http-status");
const ProjectsService = require("../services/ProjectsService");
const throwError = require("../scripts/errors/throwError");

const index = async (req, res, next) => {
  try {
    let response = await ProjectsService.list();
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  req.body.user = req.user;
  try {
    let response = await ProjectsService.insert(req.body);
    res.status(httpStatus.CREATED).send(response);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({ message: "Project id is required" });

  try {
    let response = await ProjectsService.modify({ _id: req.params.id }, req.body);
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    next(err);
  }
};

const deleteProject = async (req, res, next) => {
  if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({ message: "Project id is required" });

  try {
    let deletedProject = await ProjectsService.remove({ _id: req.params.id });

    if (!deletedProject) throwError("Project not found", httpStatus.NOT_FOUND);

    res.status(httpStatus.OK).send(deletedProject);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  create,
  update,
  deleteProject,
};
