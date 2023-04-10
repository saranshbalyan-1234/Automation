const express = require("express");
const { validateToken } = require("./Utils/Middlewares/jwt");
const helmet = require("helmet");
const cors = require("cors");
const parser = require("body-parser");
const { execute } = require("./Controllers/actionEventController");
const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);

app.use(validateToken());

app.post("/execute/:testCaseId", async (req, res) => {
  const testCaseId = req.params.testCaseId;
  if (isNaN(parseInt(testCaseId)))
    return res.status(401).json({ error: "TestCase Id must be Integer" });
  await execute(req, res);
});

app.use((req, res) => {
  return res.status(404).json({ error: "Endpoint Not Found" });
});

app.listen(3002, () => {
  console.log("You can execute now!");
});
