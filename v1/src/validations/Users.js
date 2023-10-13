const Joi = require("joi");

const createValidation = Joi.object({
  full_name: Joi.string().required().min(3).max(30),
  password: Joi.string().required().min(8).max(36),
  email: Joi.string().email().required(),
  profile_image: Joi.string().optional().allow(""),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(36),
});

const resetPasswordValidation = Joi.object({
  email: Joi.string().email().required(),
});

const changePasswordValidation = Joi.object({
  password: Joi.string().required().min(8).max(36),
  password_new: Joi.string().required().min(8).max(36),
});

const updateValidation = Joi.object({
  full_name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  profile_image: Joi.string().optional().allow(""),
});

const updateProfileImageValidation = Joi.object({});

module.exports = {
  createValidation,
  loginValidation,
  resetPasswordValidation,
  updateValidation,
  changePasswordValidation,
  updateProfileImageValidation,
};
