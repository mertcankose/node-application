const BaseService = require("./BaseService");
const UserModel = require("../models/User");

class UsersService extends BaseService {
  model = UserModel;

  async loginUser(data) {
    return UserModel.findOne(data);
  }
}

module.exports = new UsersService();
