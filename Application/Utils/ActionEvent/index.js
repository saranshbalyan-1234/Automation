const chromeDriver = require("selenium-webdriver");
const { findByLocator } = require("./utils");
const {
  implicitWait,
  waitUntilObjectLocated,
  waitUntilObjectsLocated,
  waitUntilObjectEnabled,
  waitUntilObjectDisabled,
  waitUntilObjectNotSelected,
  waitUntilObjectSelected,
  waitUntilObjectNotVisible,
  waitUntilObjectVisible,
  waitUntilObjectTextContains,
  waitUntilObjectTextIs,
  waitUntilObjectTextMatches,
  waitUntilObjectStalenessOf,
  waitUntilTitleContains,
  waitUntilTitleIs,
  waitUntilTitleMatches,
  waitUntilUrlContains,
  waitUntilUrlIs,
  waitUntilUrlMatches,
  waitUntilAlertPresent,
  waitUntilAbleToSwitchToFrame,
} = require("./wait");
const { Key } = chromeDriver;

const handleStep = async (step, driver) => {
  switch (step.actionEvent) {
    case "Launch Website":
      await launchWebsite(step, driver);
      break;
    case "Click":
      await click(step, driver);
      break;
    case "Enter Text":
      await enterText(step, driver);
      break;
    case "Press Button":
      await pressButton(step, driver);
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
    case "Wait Until Objects Located":
      await waitUntilObjectsLocated(step, driver);
      break;
    case "Wait Until Object Enabled":
      await waitUntilObjectEnabled(step, driver);
      break;
    case "Wait Until Object Disabled":
      await waitUntilObjectDisabled(step, driver);
      break;
    case "Wait Until Object Selected":
      await waitUntilObjectSelected(step, driver);
      break;
    case "Wait Until Object Not Selected":
      await waitUntilObjectNotSelected(step, driver);
      break;
    case "Wait Until Object Visible":
      await waitUntilObjectVisible(step, driver);
      break;
    case "Wait Until Object Not Visible":
      await waitUntilObjectNotVisible(step, driver);
      break;
    case "Wait Until Alert Present":
      await waitUntilAlertPresent(step, driver);
      break;
    case "Wait Until Object Text Contains":
      await waitUntilObjectTextContains(step, driver);
      break;
    case "Wait Until Object Text Is":
      await waitUntilObjectTextIs(step, driver);
      break;
    case "Wait Until Object Text Matches":
      await waitUntilObjectTextMatches(step, driver);
      break;
    case "Wait Until Title Contains":
      await waitUntilTitleContains(step, driver);
      break;
    case "Wait Until Title Is":
      await waitUntilTitleIs(step, driver);
      break;
    case "Wait Until Title Matches":
      await waitUntilTitleMatches(step, driver);
      break;
    case "Wait Until Url Contains":
      await waitUntilUrlContains(step, driver);
      break;
    case "Wait Until Url Is":
      await waitUntilUrlIs(step, driver);
      break;
    case "Wait Until Url Matches":
      await waitUntilUrlMatches(step, driver);
      break;
    case "Wait Until Object Staleness Of":
      await waitUntilObjectStalenessOf(step, driver);
      break;
    case "Wait Until Able To Switch Frame":
      await waitUntilAbleToSwitchToFrame(step, driver);
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

const click = async (step, driver) => {
  await driver
    .findElement(await findByLocator(step.object.dataValues.locators))
    .click();
};

const enterText = async (step, driver) => {
  const text = step.testParameters.Text;
  await driver
    .findElement(await findByLocator(step.object.dataValues.locators))
    .sendKeys(text);
};

const pressButton = async (step, driver) => {
  const Button = step.testParameters.Button;
  await driver
    .findElement(await findByLocator(step.object.dataValues.locators))
    .sendKeys(Key[Button]);
};
const maximizeBrowser = async (driver) => {
  return await driver.manage().window().maximize();
};

const closeBrowser = async () => {
  console.log("Browser Closed");
  return await driver.quit();
};

module.exports = { handleStep };
