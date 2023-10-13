const Joi = require("joi");

const createValidation = Joi.object({
  name: Joi.string().required().min(3).max(30),
  order: Joi.number().required().default(-1),
});

const updateValidation = Joi.object({
  name: Joi.string().required().min(3).max(30),
  order: Joi.number().optional().default(-1),
  project: Joi.string().optional().allow(""),
});

const deleteValidation = Joi.object({});

module.exports = {
  createValidation,
  updateValidation,
  deleteValidation,
};
