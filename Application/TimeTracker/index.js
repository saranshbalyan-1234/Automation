import express from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import parser from "body-parser";
import { validateToken } from "./Utils/Middlewares/jwt.js";
import trackingRoutes from "./Routes/trackingRoutes.js";

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

app.use(validateToken());
app.use("/tracking", trackingRoutes);

app.use((req, res) => {
  return res.status(404).json({ error: "Endpoint Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
