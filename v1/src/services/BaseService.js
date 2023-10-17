class BaseService {
  async list(where, populateOptions) {
    const query = this.model.find(where || {});

    if (populateOptions) {
      if (Array.isArray(populateOptions)) {
        populateOptions.forEach((option) => query.populate(option));
      } else {
        query.populate(populateOptions);
      }
    }

    return query;
  }

  async insert(data) {
    const instance = this.model(data);
    return instance.save();
  }

  async find(data) {
    // data -> {_id: id}
    return this.model.findOne(data);
  }

  async modify(where, data) {
    return this.model.findOneAndUpdate(where, data, { new: true });
  }

  async remove(where) {
    return this.model.findOneAndDelete(where, { new: true });
  }
}

module.exports = BaseService;
