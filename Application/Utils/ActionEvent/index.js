const chromeDriver = require("selenium-webdriver");
const { findByLocator } = require("./utils");
const {
  implicitWait,
  waitUntilObjectLocated,
  waitUntilObjectIsEnabled,
  waitUntilObjectIsDisabled,
} = require("./wait");
const { By, until } = chromeDriver;
//totalActionEvents = 7
const handleStep = async (step, driver) => {
  switch (step.actionEvent) {
    case "Launch Website":
      await launchWebsite(step, driver);
      break;
    case "Maximize Browser":
      await maximizeBrowser(driver);
      break;
    case "Close Browser":
      await closeBrowser();
    case "Wait":
      await implicitWait(step, driver);
      break;
    case "Wait Until Object Located":
      await waitUntilObjectLocated(step, driver);
      break;
    case "Wait Until Object Enabled":
      await waitUntilObjectIsEnabled(step, driver);
      break;
    case "Wait Until Object Disabled":
      await waitUntilObjectIsDisabled(step, driver);
      break;
    default:
      break;
  }
  return true;
};

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

const closeBrowser = async () => {
  console.log("Browser Closed");
  return await driver.quit();
};

module.exports = { handleStep };
