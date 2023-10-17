const express = require("express");
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
const UsersController = require("../controllers/Users");

const router = express.Router();

router.get("/", UsersController.index.bind(UsersController));
router.patch("/", authenticate, validate(updateValidation), UsersController.update.bind(UsersController));
router.post("/register", validate(createValidation), UsersController.create.bind(UsersController));
router.post("/login", validate(loginValidation), UsersController.login.bind(UsersController));
router.get("/projects", authenticate, UsersController.getUserProjects.bind(UsersController));
router.post("/reset-password", validate(resetPasswordValidation), UsersController.resetPassword.bind(UsersController));
router.post("/change-password", authenticate, validate(changePasswordValidation), UsersController.changePassword.bind(UsersController));
router.post(
  "/update-profile-image",
  authenticate,
  validate(updateProfileImageValidation),
  UsersController.updateProfileImage.bind(UsersController)
);

module.exports = router;
