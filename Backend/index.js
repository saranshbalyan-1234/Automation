import express from "express";
import helmet from "helmet";
import cors from "cors";
import fileupload from "express-fileupload";
import swaggerUi from "swagger-ui-express";
import parser from "body-parser";
import { validateToken } from "./Utils/Middlewares/jwt.js";
import userRoutes from "./Routes/userRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import mailRoutes from "./Routes/mailRoutes.js";
import roleRoutes from "./Routes/roleRoutes.js";
import globalRoutes from "./Routes/globalRoutes.js";
import projectRoutes from "./Routes/projectRoutes.js";
import testCaseRoutes from "./Routes/TestCase/testCase.js";
import objectRoutes from "./Routes/TestCase/object.js";
import testStepRoutes from "./Routes/TestCase/testStep.js";
import reusableProcessRoutes from "./Routes/TestCase/reusableProcess.js";
import executionHistoryRoutes from "./Routes/TestCase/executionHistory.js";
import awsRoutes from "./Routes/awsRoutes.js";
import environmentRoutes from "./Routes/TestCase/environment.js";
import defectRoutes from "./Routes/defectRoutes.js";

import dashboardRoutes from "./Routes/dashboardRoutes.js";

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
app.use(fileupload());
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
app.use("/object", objectRoutes);
app.use("/teststep", testStepRoutes);
app.use("/reusableProcess", reusableProcessRoutes);
app.use("/executionHistory", executionHistoryRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/aws", awsRoutes);
app.use("/environment", environmentRoutes);
app.use("/defect", defectRoutes);

app.use((req, res) => {
  return res.status(404).json({ error: "Endpoint Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
