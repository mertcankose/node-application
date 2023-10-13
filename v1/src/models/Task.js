const Mongoose = require("mongoose");
const tasksLogger = require("../scripts/logger/Tasks");

const TaskSchema = new Mongoose.Schema(
  {
    title: String,
    description: String,
    assigned_to: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
    },
    due_date: Date,
    statuses: [String],
    section: {
      type: Mongoose.Types.ObjectId,
      ref: "section",
    },
    project: {
      type: Mongoose.Types.ObjectId,
      ref: "project",
    },
    user: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
    },
    order: Number,
    isCompleted: Boolean,
    comments: [
      {
        comment: String,
        media: [String],
        user: {
          type: Mongoose.Types.ObjectId,
          ref: "user",
        },
        created_at: Date,
        updated_at: Date,
      },
    ],
    media: [String],
    sub_tasks: [
      {
        type: Mongoose.Types.ObjectId,
        ref: "task",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

// Kayıt edilen data loglanıyor.
TaskSchema.post("save", (object) => {
  tasksLogger.log("add", object, "info");
});

// update edilen datayı logla
TaskSchema.post("findOneAndUpdate", (object) => {
  tasksLogger.log("update", object, "info");
});

module.exports = Mongoose.model("task", TaskSchema);
