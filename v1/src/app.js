const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const config = require("./config");
const loaders = require("./loaders");
const events = require("./scripts/events");
const fileUpload = require("express-fileupload");
const { UsersRoute, ProjectsRoute, SectionsRoute, TasksRoute } = require("./routes");
const path = require("path");
const httpStatus = require("http-status");
const errorHandler = require("./middlewares/errorHandler");

config();
loaders();
events();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")));
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(fileUpload());

const appPort = process.env.APP_PORT;

app.listen(appPort, () => {
  console.log(`Server is up on the ${appPort}!`);
  app.use("/users", UsersRoute);
  app.use("/projects", ProjectsRoute);
  app.use("/sections", SectionsRoute);
  app.use("/tasks", TasksRoute);

  app.use((req, res, next) => {
    const error = new Error("Route Not found");
    error.status = httpStatus.NOT_FOUND;
    next(error);
  });

  app.use(errorHandler);
});
