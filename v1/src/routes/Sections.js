const express = require("express");
const validate = require("../middlewares/validate");
const { createValidation, updateValidation, deleteValidation } = require("../validations/Sections");
const authenticate = require("../middlewares/authenticate");
const idChecker = require("../middlewares/idChecker");
const SectionsController = require("../controllers/Sections");

const router = express.Router();

router.get("/", authenticate, SectionsController.index.bind(SectionsController));
router.get("/:projectId", idChecker("projectId"), authenticate, SectionsController.listProjectSections.bind(SectionsController));
router.post(
  "/:projectId",
  idChecker("projectId"),
  authenticate,
  validate(createValidation),
  SectionsController.create.bind(SectionsController)
);
router.patch("/:id", idChecker(), authenticate, validate(updateValidation), SectionsController.update.bind(SectionsController));
router.patch(
  "/update-project/:id",
  idChecker(),
  authenticate,
  validate(updateValidation),
  SectionsController.update.bind(SectionsController)
);
router.delete("/:id", idChecker(), authenticate, validate(deleteValidation), SectionsController.remove.bind(SectionsController));

module.exports = router;
