const express = require("express");
const validate = require("../middlewares/validate");
const { createValidation, updateValidation, deleteValidation } = require("../validations/Projects");
const authenticate = require("../middlewares/authenticate");
const idChecker = require("../middlewares/idChecker");
const ProjectsController = require("../controllers/Projects");

const router = express.Router();

router.get("/", authenticate, ProjectsController.index.bind(ProjectsController));
router.post("/", authenticate, validate(createValidation), ProjectsController.create.bind(ProjectsController));
router.patch("/:id", idChecker(), authenticate, validate(updateValidation), ProjectsController.update.bind(ProjectsController));
router.delete("/:id", idChecker(), authenticate, validate(deleteValidation), ProjectsController.remove.bind(ProjectsController));

module.exports = router;
