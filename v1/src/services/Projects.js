const ProjectModel = require("../models/Project");

const listProjects = (where) => {
  return ProjectModel.find(where || {}).populate({
    path: "user_id",
    select: "full_name email profile_image",
  });
};

const insert = (data) => {
  const project = ProjectModel(data);

  return project.save();
};

const findProject = (data) => {
  return ProjectModel.findOne({ _id: data._id });
};

const updateProject = async (id, data) => {
  const updatedProject = await ProjectModel.findByIdAndUpdate(id, data, { new: true });

  return updatedProject;
};

module.exports = {
  listProjects,
  insert,
  findProject,
  updateProject,
};
