const Mongoose = require("mongoose");
const usersLogger = require("../scripts/logger/Users");

const UserSchema = new Mongoose.Schema(
  {
    full_name: String,
    password: String,
    email: String,
    profile_image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

// Kayıt edilen data loglanıyor.
UserSchema.post("save", (object) => {
  usersLogger.log({
    level: "info",
    message: object,
  });
});

// Kayıt edilen data loglanıyor.
UserSchema.post("save", (object) => {
  usersLogger.log("add", object, "info");
});

// update edilen datayı logla
UserSchema.post("findOneAndUpdate", (object) => {
  usersLogger.log("update", object, "info");
});

module.exports = Mongoose.model("user", UserSchema);
