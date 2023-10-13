const Mongoose = require("mongoose");
const projectsLogger = require("../scripts/logger/Projects");

const ProjectSchema = new Mongoose.Schema(
  {
    name: String,
    description: String,
    user: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

// ProjectSchema.pre("save", (next, doc) => {
//   console.log("Before: ", doc);
//   next();
// });

// Kayıt edilen data loglanıyor.
ProjectSchema.post("save", (object) => {
  projectsLogger.log("add", object, "info");
});

// update edilen datayı logla
ProjectSchema.post("findOneAndUpdate", (object) => {
  projectsLogger.log("update", object, "info");
});

module.exports = Mongoose.model("project", ProjectSchema);
