// validations
// validate middleware

const express = require("express");
const { index, create, update } = require("../controllers/Projects");
const validate = require("../middlewares/validate");
const { createValidation, updateValidation } = require("../validations/Projects");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, index);
router.post("/", authenticate, validate(createValidation), create);
router.patch("/:id", authenticate, validate(updateValidation), update);

module.exports = router;
