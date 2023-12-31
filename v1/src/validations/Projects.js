const Joi = require("joi");

const createValidation = Joi.object({
  name: Joi.string().required().min(3).max(30),
  description: Joi.string(),
});

const updateValidation = Joi.object({
  name: Joi.string().required().min(3).max(30),
  description: Joi.string().optional().allow(""),
});

const deleteValidation = Joi.object({});

module.exports = {
  createValidation,
  updateValidation,
  deleteValidation,
};
