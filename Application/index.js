const express = require("express");
const { createDriver } = require("./utils");
const app = express();

app.get("/", async (req, res) => {
  /*  #swagger.tags = ["Health"] */

  try {
    let driver = await createDriver(req, res);

    await driver.get("http://www.youtube.com");
    // driver.close();
  } catch (err) {
    console.log(err);
  }
});

app.use((req, res) => {
  return res.status(404).json({ error: "Endpoint Not Found" });
});

app.listen(5001, () => {
  console.log("Server started");
});
