const express = require("express");
const { index, create, update, deleteProject } = require("../controllers/Projects");
const validate = require("../middlewares/validate");
const { createValidation, updateValidation, deleteValidation } = require("../validations/Projects");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, index);
router.post("/", authenticate, validate(createValidation), create);
router.patch("/:id", authenticate, validate(updateValidation), update);
router.delete("/:id", authenticate, validate(deleteValidation), deleteProject);

module.exports = router;
