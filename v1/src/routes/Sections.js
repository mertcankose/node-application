const express = require("express");
const { index, create, update, deleteSection, listProjectSections } = require("../controllers/Sections");
const validate = require("../middlewares/validate");
const { createValidation, updateValidation, deleteValidation } = require("../validations/Sections");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, index);
router.get("/:projectId", authenticate, listProjectSections);
router.post("/:projectId", authenticate, validate(createValidation), create);
router.patch("/:id", authenticate, validate(updateValidation), update);
router.patch("/update-project/:id", authenticate, validate(updateValidation), update);
router.delete("/:id", authenticate, validate(deleteValidation), deleteSection);

module.exports = router;
