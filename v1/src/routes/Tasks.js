const express = require("express");
const {
  index,
  create,
  update,
  deleteTask,
  createComment,
  deleteTaskComment,
  updateTaskComment,
  listTaskComments,
  addMediaToTask,
  createSubtask,
} = require("../controllers/Tasks");
const validate = require("../middlewares/validate");
const {
  createValidation,
  updateValidation,
  deleteValidation,
  commentCreateValidation,
  commentDeleteValidation,
  commentUpdateValidation,
  mediaCreateValidation,
  subtaskCreateValidation,
} = require("../validations/Tasks");
const authenticate = require("../middlewares/authenticate");
const idChecker = require("../middlewares/idChecker");
const TasksController = require("../controllers/Tasks");

const router = express.Router();

router.get("/", authenticate, TasksController.index.bind(TasksController));
router.post("/", authenticate, validate(createValidation), TasksController.create.bind(TasksController));
router.patch("/:id", idChecker(), authenticate, validate(updateValidation), TasksController.update.bind(TasksController));
router.delete("/:id", idChecker(), authenticate, validate(deleteValidation), TasksController.remove.bind(TasksController));
router.post(
  "/add-media/:taskId",
  idChecker("taskId"),
  authenticate,
  validate(mediaCreateValidation),
  TasksController.addMediaToTask.bind(TasksController)
);
router.post(
  "/add-subtask/:taskId",
  idChecker("taskId"),
  authenticate,
  validate(subtaskCreateValidation),
  TasksController.createSubtask.bind(TasksController)
);
router.post(
  "/add-comment/:taskId",
  idChecker("taskId"),
  authenticate,
  validate(commentCreateValidation),
  TasksController.createComment.bind(TasksController)
);
router.delete(
  "/delete-comment/:taskId",
  idChecker("taskId"),
  authenticate,
  validate(commentDeleteValidation),
  TasksController.deleteTaskComment.bind(TasksController)
);
router.patch(
  "/update-comment/:taskId",
  idChecker("taskId"),
  authenticate,
  validate(commentUpdateValidation),
  TasksController.updateTaskComment.bind(TasksController)
);
router.get("/list-comments/:taskId", idChecker("taskId"), authenticate, listTaskComments);

module.exports = router;
