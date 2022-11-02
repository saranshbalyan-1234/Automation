const chromeDriver = require("selenium-webdriver");

//totalActionEvents = 5
const handleStep = async (step, driver) => {
  switch (step.actionEvent) {
    case "Launch Website":
      await launchWebsite(step, driver);
      break;
    case "Maximize Browser":
      await maximizeBrowser(driver);
      break;
    case "Wait":
      await implicitWait(step, driver);
      break;
    case "Close Browser":
      await closeBrowser();
    case "Wait Until Object Located":
      await waitUntilObjectLocated(step, driver);
    default:
      return true;
  }
  return true;
};

const findObject = (object) => {};
const launchWebsite = async (step, driver) => {
  console.log("Launching Website: " + step.testParameters.URL);
  try {
    if (step.testParameters.URL.includes("http"))
      return await driver.get(step.testParameters.URL);
    else return await driver.get("http://" + step.testParameters.URL);
  } catch (err) {
    console.log(err);
  }
};

const maximizeBrowser = async (driver) => {
  return await driver.manage().window().maximize();
};
const implicitWait = async (step, driver) => {
  const time = Number(step.testParameters.Time);
  console.log("Waiting for " + time + " ms");
  return await driver.sleep(time);
};
const closeBrowser = async () => {
  console.log("Browser Closed");
  return await driver.quit();
};

const waitUntilObjectLocated = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async function () {
      chromeDriver.until.elementLocated(
        chromeDriver.By.xpath("//input[@id='searchs']")
      );
    }, 2000);
  } catch (err) {
    console.log(err);
  }
};
module.exports = { handleStep };
