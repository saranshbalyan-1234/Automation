const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const parser = require("body-parser");
const { validateToken } = require("./Utils/Middlewares/jwt.js");
const trackingRoutes = require("./Routes/trackingRoutes.js");
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

app.listen(3005, () => {
  console.log("Server started");
});
