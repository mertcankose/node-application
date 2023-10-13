const Joi = require("joi");

const createValidation = Joi.object({
  title: Joi.string().required().min(3).max(30),
  description: Joi.string().optional().allow(""),
  assigned_to: Joi.string().optional().allow(""),
  due_date: Joi.date().optional().allow(""),
  statuses: Joi.array().optional().allow(""),
  section: Joi.string().required(),
  project: Joi.string().required(),
  user: Joi.string().optional(), // tokendan alınacak
  order: Joi.number().optional().default(-1),
  isCompleted: Joi.boolean().optional().default(false),
  comments: Joi.array().optional().allow(""),
  media: Joi.array().optional().allow(""),
  sub_tasks: Joi.array().optional().allow(""),
});

const updateValidation = Joi.object({
  title: Joi.string().optional().min(3).max(30),
  description: Joi.string().optional().allow(""),
  assigned_to: Joi.string().optional().allow(""),
  due_date: Joi.date().optional().allow(""),
  statuses: Joi.array().optional().allow(""),
  section: Joi.string().optional().allow(""),
  project: Joi.string().optional().allow(""),
  user: Joi.string().optional().allow(""),
  order: Joi.number().optional().default(-1),
  isCompleted: Joi.boolean().optional().default(false),
  comments: Joi.array().optional().allow(""),
  media: Joi.array().optional().allow(""),
  sub_tasks: Joi.array().optional().allow(""),
});

const deleteValidation = Joi.object({});

const commentCreateValidation = Joi.object({
  comment: Joi.string().required().min(3).max(30),
  media: Joi.array().optional().allow(""),
  user: Joi.string().optional().allow(""),
  created_at: Joi.string().optional().default(new Date()),
  updated_at: Joi.string().optional().default(new Date()),
});

const commentDeleteValidation = Joi.object({
  commentId: Joi.string().required(),
});

const commentUpdateValidation = Joi.object({
  commentId: Joi.string().required(),
  comment: Joi.string().optional().min(3).max(30),
  media: Joi.array().optional().allow(""),
  user: Joi.string().optional().allow(""),
  created_at: Joi.string().optional().allow(""),
  updated_at: Joi.string().optional().allow(""),
});

const mediaCreateValidation = Joi.object({
  media: Joi.array().optional(),
}).unknown(true);

const subtaskCreateValidation = Joi.object({
  title: Joi.string().required().min(3).max(30),
  description: Joi.string().optional().allow("").default(""),
  assigned_to: Joi.string().optional().allow("").default(""),
  due_date: Joi.date().optional().default(""),
  statuses: Joi.array().optional().allow("").default([]),
  section: Joi.string().required(),
  project: Joi.string().required(),
  user: Joi.string().optional().allow(""),
  order: Joi.number().optional().default(-1),
  isCompleted: Joi.boolean().optional().default(false),
  comments: Joi.array().optional().allow(""),
  media: Joi.array().optional().allow(""),
  sub_tasks: Joi.array().optional().allow(""),
});

module.exports = {
  createValidation,
  updateValidation,
  deleteValidation,
  commentCreateValidation,
  commentDeleteValidation,
  commentUpdateValidation,
  mediaCreateValidation,
  subtaskCreateValidation,
};
