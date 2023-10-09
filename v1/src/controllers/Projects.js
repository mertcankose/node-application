const { insert, listProjects, updateProject } = require("../services/Projects");
const httpStatus = require("http-status");

const index = async (req, res) => {
  try {
    let response = await listProjects();
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const create = async (req, res) => {
  req.body.user_id = req.user;
  try {
    let response = await insert(req.body);
    res.status(httpStatus.CREATED).send(response);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const update = async (req, res) => {
  if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({ message: "Project id is required" });

  try {
    let response = await updateProject(req.params.id, req.body);
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    console.log("err: ", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

module.exports = {
  index,
  create,
  update,
};
