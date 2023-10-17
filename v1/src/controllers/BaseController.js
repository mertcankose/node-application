const httpStatus = require("http-status");
const throwError = require("../scripts/errors/throwError");

class BaseController {
  async index(req, res, next) {
    try {
      let response = await this.service.list();
      res.status(httpStatus.OK).send(response);
    } catch (err) {
      next(err);
    }
  }

  async create(req, res, next) {
    req.body.user = req.user;
    try {
      let response = await this.service.insert(req.body);
      res.status(httpStatus.CREATED).send(response);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    console.log("updateding: ", this);
    try {
      let response = await this.service.modify({ _id: req.params.id }, req.body);
      res.status(httpStatus.OK).send(response);
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      let deletedItem = await this.service.remove({ _id: req.params.id });

      if (!deletedItem) throwError("Item not found", httpStatus.NOT_FOUND);

      res.status(httpStatus.OK).send(deletedItem);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BaseController;
