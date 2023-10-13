const httpStatus = require("http-status");
const SectionsService = require("../services/SectionsService");

const index = async (req, res, next) => {
  try {
    let response = await SectionsService.list();
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    next(err);
  }
};

const listProjectSections = async (req, res, next) => {
  if (!req.params.projectId) return res.status(httpStatus.BAD_REQUEST).send({ message: "Project id is required" });

  try {
    let response = await SectionsService.list({ project: req.params.projectId });
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  if (!req.params.projectId) return res.status(httpStatus.BAD_REQUEST).send({ message: "Project id is required" });

  req.body.user = req.user;
  req.body.project = req.params.projectId;

  try {
    let response = await SectionsService.insert(req.body);
    res.status(httpStatus.CREATED).send(response);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({ message: "Section id is required" });

  try {
    let response = await SectionsService.modify({ _id: req.params.id }, req.body);
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    next(err);
  }
};

const deleteSection = async (req, res, next) => {
  if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({ message: "Section id is required" });

  try {
    let deletedSection = await SectionsService.remove({ _id: req.params.id });

    if (!deletedSection) throwError("Section not found", httpStatus.NOT_FOUND);

    res.status(httpStatus.OK).send(deletedSection);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  create,
  update,
  deleteSection,
  listProjectSections,
};
