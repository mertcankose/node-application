const express = require("express");
const {
  index,
  create,
  login,
  getUserProjects,
  resetPassword,
  update,
  changePassword,
  updateProfileImage,
} = require("../controllers/Users");
const validate = require("../middlewares/validate");
const {
  createValidation,
  loginValidation,
  resetPasswordValidation,
  updateValidation,
  changePasswordValidation,
  updateProfileImageValidation,
} = require("../validations/Users");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", index);
router.patch("/", authenticate, validate(updateValidation), update);
router.post("/register", validate(createValidation), create);
router.post("/login", validate(loginValidation), login);
router.get("/projects", authenticate, getUserProjects);
router.post("/reset-password", validate(resetPasswordValidation), resetPassword);
router.post("/change-password", authenticate, validate(changePasswordValidation), changePassword);
router.post("/update-profile-image", authenticate, validate(updateProfileImageValidation), updateProfileImage);

module.exports = router;
