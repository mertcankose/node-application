const eventEmitter = require("../scripts/events/eventEmitter");
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../scripts/utils/userHelpers");
const { listProjects } = require("../services/Projects");
const { insert, list, loginUser, findUser, modify } = require("../services/Users");
const httpStatus = require("http-status");
const uuid = require("uuid");

const index = async (req, res) => {
  try {
    let response = await list();
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const create = async (req, res) => {
  const user = await findUser(req.body);
  if (user) return res.status(httpStatus.BAD_REQUEST).send({ message: "User already exists" });

  req.body.password = passwordToHash(req.body.password);

  try {
    let response = await insert(req.body);
    res.status(httpStatus.CREATED).send(response);
  } catch (err) {
    console.log("err: ", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const login = async (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  try {
    let user = await loginUser(req.body);
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
    console.log("err: ", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err.toString() });
  }
};

const getUserProjects = async (req, res) => {
  try {
    let response = await listProjects({ user_id: req.user?._id });
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    console.log(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const resetPassword = async (req, res) => {
  const newPassword = uuid.v4().split("-")[0] || `usr-${new Date().getTime()}`;
  try {
    let updatedUser = await modify({ email: req.body.email }, { password: passwordToHash(newPassword) });
    if (!updatedUser) return res.status(httpStatus.NOT_FOUND).send({ message: "User not found" });

    eventEmitter.emit("send_email", { email: req.body.email, newPassword: newPassword });
    res.status(httpStatus.OK).send({ message: "Your password resetted successfully, please control your email" });
  } catch (err) {
    console.log(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err });
  }
};

const update = async (req, res) => {
  try {
    let updatedUser = await modify({ _id: req.user?._id }, req.body);
    res.status(httpStatus.OK).send(updatedUser);
  } catch (err) {
    console.log("err: ", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "hata" });
  }
};

module.exports = {
  index,
  create,
  login,
  getUserProjects,
  resetPassword,
  update,
};
