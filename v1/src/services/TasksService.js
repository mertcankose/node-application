const TaskModel = require("../models/Task");

const BaseService = require("./BaseService");

class TasksService extends BaseService {
  model = TaskModel;

  async insertSubtask(id, subtaskId) {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        $push: {
          sub_tasks: subtaskId,
        },
      },
      { new: true }
    );

    return updatedTask;
  }

  async listComments(id) {
    const comments = await TaskModel.findById(id, { comments: 1 }).populate({
      path: "comments.user",
      select: "full_name email profile_image",
    });

    return comments;
  }

  async insertComment(id, data) {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: data,
        },
      },
      { new: true }
    );

    return updatedTask;
  }

  async deleteComment(id, commentId) {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      {
        $pull: {
          comments: { _id: commentId },
        },
      },
      { new: true }
    );

    return updatedTask;
  }

  async updateComment(id, commentId, data) {
    const updatedComment = await TaskModel.findOneAndUpdate(
      {
        _id: id,
        "comments._id": commentId,
      },
      {
        $set: {
          "comments.$.comment": data.comment,
          "comments.$.media": data.media,
          "comments.$.updated_at": new Date(),
        },
      },
      { new: true }
    );

    return updatedComment;
  }
}

module.exports = new TasksService();
