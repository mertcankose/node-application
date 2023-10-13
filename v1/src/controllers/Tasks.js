const httpStatus = require("http-status");
const path = require("path");
const uuid = require("uuid");
const TasksService = require("../services/TasksService");
const throwError = require("../scripts/errors/throwError");

const index = async (req, res, next) => {
  const populateOptions = [
    {
      path: "user",
      select: "full_name email profile_image",
    },
    {
      path: "sub_tasks",
      // all select
      select: "-__v",
    },
  ];

  try {
    let response = await TasksService.list({}, populateOptions);
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  req.body.user = req.user;

  try {
    let response = await TasksService.insert(req.body);
    res.status(httpStatus.CREATED).send(response);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  if (!req.params.id) throwError("Task id is required", httpStatus.BAD_REQUEST);

  try {
    let response = await TasksService.modify({ _id: req.params.id }, req.body);
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  if (!req.params.id) throwError("Task id is required", httpStatus.BAD_REQUEST);

  try {
    let deletedTask = await TasksService.remove({ _id: req.params.id });

    if (!deletedTask) throwError("Task not found", httpStatus.NOT_FOUND);

    res.status(httpStatus.OK).send(deletedTask);
  } catch (err) {
    next(err);
  }
};

const addMediaToTask = async (req, res, next) => {
  if (!req.params.taskId) throwError("Task id is required", httpStatus.BAD_REQUEST);

  try {
    let media = [];

    if (req.files?.media && req.files?.media.length > 0) {
      req.files.media.forEach((file) => {
        const fileExtension = path.extname(file.name);
        const fileName = `${req.params.taskId}-${uuid.v4().split("-")[0]}${fileExtension}`;

        media.push(fileName);

        const folderPath = path.join(__dirname, "../", "uploads/tasks", fileName);

        file.mv(folderPath, async (error) => {
          if (error) throwError(error, httpStatus.INTERNAL_SERVER_ERROR);
        });
      });
    }

    let response = await TasksService.modify({ _id: req.params.taskId }, { media });
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    next(err);
  }
};

const createSubtask = async (req, res, next) => {
  if (!req.params.taskId) throwError("Task id is required", httpStatus.BAD_REQUEST);
  req.body.user = req.user;

  try {
    let task = await insert(req.body);

    let insertedSubtask = await TasksService.insertSubtask(req.params.taskId, task._id);
    res.status(httpStatus.CREATED).send(insertedSubtask);
  } catch (err) {
    next(err);
  }
};

const listTaskComments = async (req, res, next) => {
  if (!req.params.taskId) throwError("Task id is required", httpStatus.BAD_REQUEST);

  try {
    let response = await TasksService.listComments(req.params.taskId);
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    next(err);
  }
};

const createComment = async (req, res, next) => {
  if (!req.params.taskId) throwError("Task id is required", httpStatus.BAD_REQUEST);
  req.body.user = req.user;
  req.body.created_at = new Date();
  req.body.updated_at = new Date();

  try {
    let media = [];

    if (req.files?.media && req.files?.media.length > 0) {
      req.files.media.forEach((file, index) => {
        const fileExtension = path.extname(file.name);
        const fileName = `${req.params.taskId}-${uuid.v4().split("-")[0]}${fileExtension}`;

        media.push(fileName);

        const folderPath = path.join(__dirname, "../", "uploads/tasks/comments", fileName);

        file.mv(folderPath, async (error) => {
          if (error) throwError(error, httpStatus.INTERNAL_SERVER_ERROR);
        });
      });
    }
    req.body.media = media;

    let response = await TasksService.insertComment(req.params.taskId, req.body);
    res.status(httpStatus.CREATED).send(response);
  } catch (err) {
    next(err);
  }
};

const deleteTaskComment = async (req, res, next) => {
  if (!req.params.taskId) return res.status(httpStatus.BAD_REQUEST).send({ message: "Task id is required" });

  try {
    let deletedTask = await TasksService.deleteComment(req.params.taskId, req.body.commentId);

    if (!deletedTask) throwError("Task not found", httpStatus.NOT_FOUND);

    res.status(httpStatus.OK).send(deletedTask);
  } catch (err) {
    next(err);
  }
};

const updateTaskComment = async (req, res, next) => {
  if (!req.params.taskId) throwError("Task id is required", httpStatus.BAD_REQUEST);
  req.body.user = req.user;
  req.body.updated_at = new Date();

  try {
    let media = [];

    if (req.files?.media && req.files?.media.length > 0) {
      req.files.media.forEach((file) => {
        const fileExtension = path.extname(file.name);
        const fileName = `${req.params.taskId}-${uuid.v4().split("-")[0]}${fileExtension}`;

        media.push(fileName);

        const folderPath = path.join(__dirname, "../", "uploads/tasks/comments", fileName);

        file.mv(folderPath, async (error) => {
          if (error) throwError(error, httpStatus.INTERNAL_SERVER_ERROR);
        });
      });
    }
    req.body.media = media;

    let response = await TasksService.updateComment(req.params.taskId, req.body.commentId, req.body);
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  index,
  create,
  update,
  deleteTask,
  listTaskComments,
  createComment,
  deleteTaskComment,
  updateTaskComment,
  addMediaToTask,
  createSubtask,
};
