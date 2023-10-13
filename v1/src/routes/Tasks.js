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

const router = express.Router();

router.get("/", authenticate, index);
router.post("/", authenticate, validate(createValidation), create);
router.patch("/:id", authenticate, validate(updateValidation), update);
router.delete("/:id", authenticate, validate(deleteValidation), deleteTask);
router.post("/add-media/:taskId", authenticate, validate(mediaCreateValidation), addMediaToTask);
router.post("/add-subtask/:taskId", authenticate, validate(subtaskCreateValidation), createSubtask);
router.post("/add-comment/:taskId", authenticate, validate(commentCreateValidation), createComment);
router.delete("/delete-comment/:taskId", authenticate, validate(commentDeleteValidation), deleteTaskComment);
router.patch("/update-comment/:taskId", authenticate, validate(commentUpdateValidation), updateTaskComment);
router.get("/list-comments/:taskId", authenticate, listTaskComments);

module.exports = router;
