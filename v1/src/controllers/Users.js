const eventEmitter = require("../scripts/events/eventEmitter");
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../scripts/utils/userHelpers");
const httpStatus = require("http-status");
const uuid = require("uuid");
const path = require("path");
const UsersService = require("../services/UsersService");
const ProjectsService = require("../services/ProjectsService");
const throwError = require("../scripts/errors/throwError");
const BaseController = require("./BaseController");

class UsersController extends BaseController {
  service = UsersService;

  async create(req, res, next) {
    const user = await this.service.find({ email: req.body.email });
    if (user) return res.status(httpStatus.BAD_REQUEST).send({ message: "User already exists" });

    req.body.password = passwordToHash(req.body.password);

    try {
      let response = await this.service.insert(req.body);
      res.status(httpStatus.CREATED).send(response);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    req.body.password = passwordToHash(req.body.password);
    try {
      let user = await this.service.find(req.body);
      if (!user) return res.status(httpStatus.NOT_FOUND).send({ message: "User not found" });

      user = {
        ...user.toObject(),
        tokens: {
          access_token: generateAccessToken(user),
          refresh_token: generateRefreshToken(user),
        },
      };

      delete user.password;

      res.status(httpStatus.OK).send(user);
    } catch (err) {
      next(err);
    }
  }

  async getUserProjects(req, res, next) {
    try {
      const populateOptions = [
        {
          path: "user",
          select: "full_name email profile_image",
        },
      ];
      let response = await ProjectsService.list({ user: req.user?._id }, populateOptions);
      res.status(httpStatus.OK).send(response);
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(req, res, next) {
    const newPassword = uuid.v4().split("-")[0] || `usr-${new Date().getTime()}`;
    try {
      console.log("hash: ", passwordToHash(newPassword));
      let updatedUser = await this.service.modify({ email: req.body.email }, { password: passwordToHash(newPassword) });
      if (!updatedUser) throwError("User not found", httpStatus.NOT_FOUND);

      eventEmitter.emit("send_email", { email: req.body.email, content: `You new password is <b>${newPassword}</b>` });
      res.status(httpStatus.OK).send({ message: "Your password resetted successfully, please control your email" });
    } catch (err) {
      next(err);
    }
  }

  async changePassword(req, res, next) {
    // password, password_new
    try {
      let foundedUser = await this.service.find(req.user);

      if (foundedUser.password !== passwordToHash(req.body.password))
        return res.status(httpStatus.BAD_REQUEST).send({ message: "Your password is wrong!" });

      let updatedUser = await this.service.modify({ email: req.user.email }, { password: passwordToHash(req.body.password_new) });
      if (!updatedUser) throwError("User not found", httpStatus.NOT_FOUND);

      eventEmitter.emit("send_email", { email: req.user.email, content: "You password changed successfully!" });
      res.status(httpStatus.OK).send({ message: "Your password changed successfully!" });
    } catch (err) {
      next(err);
    }
  }

  async updateProfileImage(req, res, next) {
    try {
      const uploadedFile = req.files.profile_image;

      if (!uploadedFile) return res.status(httpStatus.BAD_REQUEST).send({ message: "Please upload a file" });

      const imageExtension = path.extname(uploadedFile.name);
      const fileName = `${req.user._id}${imageExtension}`;

      const folderPath = path.join(__dirname, "../", "uploads/users", fileName);

      uploadedFile.mv(folderPath, async (error) => {
        if (error) throwError(error, httpStatus.INTERNAL_SERVER_ERROR);

        let updatedUser = await this.service.modify({ _id: req.user._id }, { profile_image: fileName });

        return res.status(httpStatus.OK).send(updatedUser);
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UsersController();
