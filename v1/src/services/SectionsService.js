const SectionModel = require("../models/Section");

const BaseService = require("./BaseService");

class SectionsService extends BaseService {
  model = SectionModel;
}

module.exports = new SectionsService();
