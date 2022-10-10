import express from "express";
import webdriver from "selenium-webdriver";

const app = express();

app.get("/", async (req, res) => {
  /*  #swagger.tags = ["Health"] */

  try {
    let driver;
    try {
      driver = new webdriver.Builder()
        .setAlertBehavior("ignore")
        .forBrowser("chrome")
        .build()
        .catch(async (e) => {
          const check = JSON.stringify(e).includes("chromedriver");
          res
            .status(400)
            .json({
              error: check
                ? "Invalid ChromeDriver version"
                : "System permission issue",
            });
        });
    } catch (e) {
      return res.status(400).json({ error: "ChromeDriver not found!" });
    }

    // try {
    //   await driver.get("http://www.google.com");
    // } catch (e2) {
    //   console.log(e2);

    //   return res.status(400).json({ error: "Invalid ChromeDriver version" });
    // }
    // await driver.get("http://www.youtube.com");
    // driver.close();
  } catch (err) {
    console.log(err);
    return res.json("srsans");
  }
});

app.use((req, res) => {
  return res.status(404).json({ error: "Endpoint Not Found" });
});

app.listen(5001, () => {
  console.log("Server started");
});
