import express from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import parser from "body-parser";
import { validateToken } from "./Utils/Middlewares/jwt.js";
import userRoutes from "./Routes/userRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import mailRoutes from "./Routes/mailRoutes.js";
import roleRoutes from "./Routes/roleRoutes.js";
import globalRoutes from "./Routes/globalRoutes.js";
import projectRoutes from "./Routes/projectRoutes.js";
import testCaseRoutes from "./Routes/TestCase/testCaseRoutes.js";
import testObjectRoutes from "./Routes/TestCase/testObjectRoutes.js";
import testStepRoutes from "./Routes/TestCase/testStepRoutes.js";
import testParameterRoutes from "./Routes/TestCase/testParameterRoutes.js";
import testProcessRoutes from "./Routes/TestCase/testProcessRoutes.js";
import reusableFlowRoutes from "./Routes/TestCase/reusableFlowRoutes.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerFile = require("./swagger.json");

const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  next();
});

app.get("/", (req, res) => {
  /*  #swagger.tags = ["Health"] */
  return res.json("Server is working");
});
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/auth", authRoutes);

app.use(validateToken());
app.use("/global", globalRoutes);
app.use("/user", userRoutes);
app.use("/role", roleRoutes);
app.use("/mail", mailRoutes);
app.use("/project", projectRoutes);
app.use("/testcase", testCaseRoutes);
app.use("/testobject", testObjectRoutes);
app.use("/teststep", testStepRoutes);
app.use("/testparameter", testParameterRoutes);
app.use("/testProcess", testProcessRoutes);
app.use("/reusableFlow", reusableFlowRoutes);

app.use((req, res) => {
  return res.status(404).json({ error: "Endpoint Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
