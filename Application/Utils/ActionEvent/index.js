const chromeDriver = require("selenium-webdriver");
const { findByLocator, takeScreenshot } = require("./utils");
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

const handleStep = async (step, driver, output) => {
  switch (step.actionEvent) {
    case "Launch Website":
      await launchWebsite(step, driver);
      break;
    case "Click":
      await click(step, driver);
      break;
    case "Double Click":
      await doubleClick(step, driver);
      break;
    case "Right Click":
      await rightClick(step, driver);
      break;
    case "Enter Text":
      await enterText(step, driver);
      break;
    case "Clear Input":
      await clearInput(step, driver);
      break;
    case "Enter Password":
      await enterPassword(step, driver);
      break;
    case "Press Button":
      await pressButton(step, driver);
      break;
    case "Maximize Browser":
      await maximizeBrowser(driver);
      break;
    case "Close Browser":
      await closeBrowser(driver);
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
      break;
    case "Refresh Page":
      await refreshPage(driver);
      break;
    case "Generate Random Number":
      await generateRandomNumber(step, output);
      break;
    case "Get Page Title":
      await getPageTitle(step, driver, output);
      break;
    case "Console Log":
      await console.log(step.testParameters.Value);
      break;
    default:
      break;
  }
  if (step.screenshot) await takeScreenshot(driver);
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
  console.log("Clicking");
  await driver
    .findElement(await findByLocator(step.object.dataValues.locators))
    .click();
};
const doubleClick = async (step, driver) => {
  console.log("Double Clicking");
  await driver
    .actions()
    .doubleClick(
      await driver.findElement(
        await findByLocator(step.object.dataValues.locators)
      )
    )
    .perform();
};
const rightClick = async (step, driver) => {
  console.log("Right Clicking");
  await driver
    .actions()
    .contextClick(
      await driver.findElement(
        await findByLocator(step.object.dataValues.locators)
      )
    )
    .perform();
};

const enterText = async (step, driver) => {
  const text = step.testParameters.Text;
  console.log("Entering text " + text);
  await driver
    .findElement(await findByLocator(step.object.dataValues.locators))
    .sendKeys(text);
};
const enterPassword = async (step, driver) => {
  const password = step.testParameters.Password;
  console.log("Entering Password");
  await driver
    .findElement(await findByLocator(step.object.dataValues.locators))
    .sendKeys(password);
};

const pressButton = async (step, driver) => {
  const Button = step.testParameters.Button;
  console.log("pressing button " + Button);
  await driver
    .findElement(await findByLocator(step.object.dataValues.locators))
    .sendKeys(Key[Button]);
};
const maximizeBrowser = async (driver) => {
  console.log("Maximize Browser");
  return await driver.manage().window().maximize();
};

const closeBrowser = async (driver) => {
  console.log("Browser Closed");
  return await driver.quit();
};

const refreshPage = async (driver) => {
  await driver.navigate().refresh();
};
const generateRandomNumber = async (step, output) => {
  console.log("generating random number");
  const randomNumber = Math.floor(
    Math.random() * Math.pow(10, step.testParameters.Length)
  );
  output[step.testParameters.Output] = randomNumber;
};
const getPageTitle = async (step, driver, output) => {
  console.log("Getting Page Title");
  const title = await driver.getTitle();
  output[step.testParameters.Output] = title;
};

const clearInput = async (step, driver) => {
  console.log("Clearning Input");
  await driver
    .findElement(await findByLocator(step.object.dataValues.locators))
    .clear();
};
module.exports = { handleStep };
