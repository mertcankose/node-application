const UserModel = require("../models/User");

const list = () => {
  return UserModel.find({});
};

const insert = (data) => {
  const user = UserModel(data);

  return user.save();
};

const findUser = (user) => {
  return UserModel.findOne({ email: user.email });
};

const loginUser = (data) => {
  return UserModel.findOne(data);
};

const modify = (where, data) => {
  // Gelen data üzerinden bilgileri reduce ile filtreleyebiliriz. Joi bunun işini yapıyor. Aslında gerek yok.
  const updatedData = Object.keys(data).reduce((obj, key) => {
    if (key !== "password") obj[key] = data[key];
    return obj;
  }, {});

  return UserModel.findOneAndUpdate(where, updatedData, { new: true });
};

module.exports = {
  list,
  insert,
  loginUser,
  findUser,
  modify,
};
