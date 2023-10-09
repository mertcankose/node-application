const Mongoose = require("mongoose");

const db = Mongoose.connection;

db.once("open", () => {
  console.log("Connected to database!");
});

// db.on("connected", () => {
//   console.log("Connected to database sucessfully");
// });

db.on("error", (err) => {
  console.log("Error while connecting to database :" + err);
});

db.on("disconnected", () => {
  console.log("Mongodb connection disconnected");
});

const connectDB = async () => {
  const db_host = process.env.DB_HOST;
  const db_port = process.env.DB_PORT;
  const db_name = process.env.DB_NAME;

  const db_url = `mongodb://${db_host}:${db_port}/${db_name}`;

  await Mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectDB,
};
