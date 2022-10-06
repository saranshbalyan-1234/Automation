import express from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import parser from "body-parser";
import { validateToken } from "./Utils/Middlewares/jwt.js";
import { changeTenantDatabase } from "./Utils/Middlewares/tenant.js";
import userRoutes from "./Routes/userRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import mailRoutes from "./Routes/mailRoutes.js";
import roleRoutes from "./Routes/roleRoutes.js";
import globalRoutes from "./Routes/globalRoutes.js";
import projectRoutes from "./Routes/projectRoutes.js";
import swaggerFile from "./swagger.json";

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
app.use(validateToken());
app.use(changeTenantDatabase());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/role", roleRoutes);
app.use("/global", globalRoutes);
app.use("/mail", mailRoutes);
app.use("/project", projectRoutes);

app.use((req, res) => {
  return res.status(404).json({ error: "Endpoint Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
