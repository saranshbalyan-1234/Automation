import express from "express";
import helmet from "helmet";
import cors from "cors";
import parser from "body-parser";
import { validateToken } from "./Utils/Middlewares/jwt.js";
import { changeTenantDatabase } from "./Utils/Middlewares/tenant.js";
import userRoutes from "./Routes/userRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import jwtRoutes from "./Routes/jwtRoutes.js";
import mailRoutes from "./Routes/mailRoutes.js";
import roleRoutes from "./Routes/roleRoutes.js";
import seedRoutes from "./Routes/seedRoutes.js";
import permissionRoutes from "./Routes/permissionRoutes.js";

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
app.use(validateToken());
app.use(changeTenantDatabase());

app.use("/auth", authRoutes);
app.use("/jwt", jwtRoutes);
app.use("/user", userRoutes);
app.use("/role", roleRoutes);
app.use("/permission", permissionRoutes);
app.use("/mail", mailRoutes);
app.use("/seed", seedRoutes);

app.use((req, res) => {
  return res.status(404).json({ errors: "Endpoint Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
