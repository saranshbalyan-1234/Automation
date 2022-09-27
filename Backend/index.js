const express = require("express");
const helmet = require("helmet");
const parser = require("body-parser");
const { validateToken } = require("./Utils/Middlewares/jwt");
const userRoutes = require("./Routes/userRoutes");
const authRoutes = require("./Routes/authRoutes");
const jwtRoutes = require("./Routes/jwtRoutes");
const mailRoutes = require("./Routes/mailRoutes");
const roleRoutes = require("./Routes/roleRoutes");
const seedRoutes = require("./Routes/seedRoutes");
const permissionRoutes = require("./Routes/permissionRoutes");
const { changeTenantDatabase } = require("./Utils/Middlewares/tenant");

const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(helmet());

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
