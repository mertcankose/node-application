const Mongoose = require("mongoose");
const sectionsLogger = require("../scripts/logger/Sections");

const SectionSchema = new Mongoose.Schema(
  {
    name: String,
    user: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
    },
    project: {
      type: Mongoose.Types.ObjectId,
      ref: "project",
    },
    order: Number,
  },
  { timestamps: true, versionKey: false }
);

// Kayıt edilen data loglanıyor.
SectionSchema.post("save", (object) => {
  sectionsLogger.log("add", object, "info");
});

// update edilen datayı logla
SectionSchema.post("findOneAndUpdate", (object) => {
  sectionsLogger.log("update", object, "info");
});

module.exports = Mongoose.model("section", SectionSchema);
