const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const config = require("./config");
const loaders = require("./loaders");
const events = require("./scripts/events");
const { ProjectsRoute } = require("./routes");
const { UsersRoute } = require("./routes");

const app = express();

config();
loaders();
events();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));

const appPort = process.env.APP_PORT;

app.listen(appPort, () => {
  console.log(`Server is up on the ${appPort}!`);
  app.use("/projects", ProjectsRoute);
  app.use("/users", UsersRoute);
});
