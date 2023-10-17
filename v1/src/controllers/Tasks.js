const httpStatus = require("http-status");
const path = require("path");
const uuid = require("uuid");
const TasksService = require("../services/TasksService");
const throwError = require("../scripts/errors/throwError");
const BaseController = require("./BaseController");

class TasksController extends BaseController {
  service = TasksService;

  async index(req, res, next) {
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
      let response = await this.service.list({}, populateOptions);
      res.status(httpStatus.OK).send(response);
    } catch (err) {
      next(err);
    }
  }

  async addMediaToTask(req, res, next) {
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

      let response = await this.service.modify({ _id: req.params.taskId }, { media });
      res.status(httpStatus.OK).send(response);
    } catch (err) {
      next(err);
    }
  }

  async createSubtask(req, res, next) {
    if (!req.params.taskId) throwError("Task id is required", httpStatus.BAD_REQUEST);
    req.body.user = req.user;

    try {
      let task = await insert(req.body);

      let insertedSubtask = await this.service.insertSubtask(req.params.taskId, task._id);
      res.status(httpStatus.CREATED).send(insertedSubtask);
    } catch (err) {
      next(err);
    }
  }

  async listTaskComments(req, res, next) {
    if (!req.params.taskId) throwError("Task id is required", httpStatus.BAD_REQUEST);

    try {
      let response = await this.service.listComments(req.params.taskId);
      res.status(httpStatus.OK).send(response);
    } catch (err) {
      next(err);
    }
  }

  async createComment(req, res, next) {
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

      let response = await this.service.insertComment(req.params.taskId, req.body);
      res.status(httpStatus.CREATED).send(response);
    } catch (err) {
      next(err);
    }
  }

  async deleteTaskComment(req, res, next) {
    if (!req.params.taskId) return res.status(httpStatus.BAD_REQUEST).send({ message: "Task id is required" });

    try {
      let deletedTask = await this.service.deleteComment(req.params.taskId, req.body.commentId);

      if (!deletedTask) throwError("Task not found", httpStatus.NOT_FOUND);

      res.status(httpStatus.OK).send(deletedTask);
    } catch (err) {
      next(err);
    }
  }

  async updateTaskComment(req, res, next) {
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

      let response = await this.service.updateComment(req.params.taskId, req.body.commentId, req.body);
      res.status(httpStatus.OK).send(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TasksController();
