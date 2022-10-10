var webdriver = require("selenium-webdriver");

execute();

async function execute() {
  try {
    var driver = new webdriver.Builder()
      .setAlertBehavior("ignore")
      .forBrowser("chrome")
      .build();
    await driver.get("http://www.lambdatest.com");
    driver.close();
  } catch (err) {
    console.log("sad", err);
  }
}
