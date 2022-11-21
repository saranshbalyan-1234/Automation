const chromeDriver = require("selenium-webdriver");
const { findByLocator, takeScreenshot } = require("./utils");
const { By } = chromeDriver;
const moment = require("moment");
const { createFolder } = require("../../Controllers/awsController");
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
const {
  updateStepResult,
} = require("../../Controllers/executionHistoryController");
const { Key } = chromeDriver;

const handleStep = async (
  step,
  driver,
  output,
  req,
  stepHistory,
  processResult,
  executionHistory,
  canCreateS3Folder
) => {
  switch (step.actionEvent) {
    case "Launch Website":
      await launchWebsite(step, driver, req, stepHistory, processResult);
      break;
    case "Click":
      await click(step, driver, processResult, req);
      break;
    case "Double Click":
      await doubleClick(step, driver, processResult, req);
      break;
    case "Right Click":
      await rightClick(step, driver, processResult), req;
      break;
    case "Enter Text":
      await enterText(step, driver, processResult, req);
      break;
    case "Clear Input":
      await clearInput(step, driver, processResult, req);
      break;
    case "Enter Password":
      await enterPassword(step, driver, processResult, req);
      break;
    case "Press Button":
      await pressButton(step, driver, processResult, req);
      break;
    case "Maximize Browser":
      await maximizeBrowser(driver, processResult, req);
      break;
    case "Close Browser":
      await closeBrowser(driver, processResult, req);
    case "Wait":
      await implicitWait(step, driver, processResult, req);
      break;
    case "Wait Until Object Located":
      await waitUntilObjectLocated(step, driver, processResult, req);
      break;
    case "Wait Until Objects Located":
      await waitUntilObjectsLocated(step, driver, processResult, req);
      break;
    case "Wait Until Object Enabled":
      await waitUntilObjectEnabled(step, driver, processResult, req);
      break;
    case "Wait Until Object Disabled":
      await waitUntilObjectDisabled(step, driver, processResult, req);
      break;
    case "Wait Until Object Selected":
      await waitUntilObjectSelected(step, driver, processResult, req);
      break;
    case "Wait Until Object Not Selected":
      await waitUntilObjectNotSelected(step, driver, processResult), req;
      break;
    case "Wait Until Object Visible":
      await waitUntilObjectVisible(step, driver, processResult, req);
      break;
    case "Wait Until Object Not Visible":
      await waitUntilObjectNotVisible(step, driver, processResult, req);
      break;
    case "Wait Until Alert Present":
      await waitUntilAlertPresent(step, driver, processResult, req);
      break;
    case "Wait Until Object Text Contains":
      await waitUntilObjectTextContains(step, driver, processResult, req);
      break;
    case "Wait Until Object Text Is":
      await waitUntilObjectTextIs(step, driver, processResult, req);
      break;
    case "Wait Until Object Text Matches":
      await waitUntilObjectTextMatches(step, driver, processResult, req);
      break;
    case "Wait Until Title Contains":
      await waitUntilTitleContains(step, driver, processResult, req);
      break;
    case "Wait Until Title Is":
      await waitUntilTitleIs(step, driver, processResult, req);
      break;
    case "Wait Until Title Matches":
      await waitUntilTitleMatches(step, driver, processResult, req);
      break;
    case "Wait Until Url Contains":
      await waitUntilUrlContains(step, driver, processResult, req);
      break;
    case "Wait Until Url Is":
      await waitUntilUrlIs(step, driver, processResult, req);
      break;
    case "Wait Until Url Matches":
      await waitUntilUrlMatches(step, driver, processResult, req);
      break;
    case "Wait Until Object Staleness Of":
      await waitUntilObjectStalenessOf(step, driver, processResult, req);
      break;
    case "Wait Until Able To Switch Frame":
      await waitUntilAbleToSwitchToFrame(step, driver, processResult, req);
      break;
    case "Refresh Page":
      await refreshPage(driver, processResult, req);
      break;
    case "Generate Random Number":
      await generateRandomNumber(step, output, processResult, req);
      break;
    case "Get Page Title":
      await getPageTitle(step, driver, output, processResult, req);
      break;
    case "Console Log":
      await console.log(step.testParameters.Value, processResult, req);
      break;
    case "Scroll To Object":
      await scrollToObject(step, driver, processResult, req);
      break;
    case "Scroll To End":
      await scrollToEnd(driver, processResult, req);
      break;
    case "Scroll To Top":
      await scrollToTop(driver, processResult, req);
      break;
    case "Click By Javascript":
      await clickByJs(step, driver, processResult, req);
      break;
    case "Click Link By Text":
      await clickLinkByText(step, driver, processResult, req);
      break;
    case "Click Link By Partial Text":
      await clickLinkByPartialText(step, driver, processResult, req);
      break;
    case "Hover Mouse":
      await hoverMouse(step, driver, processResult, req);
      break;
    case "Copy Test":
      await copyText(step, output, processResult, req);
      break;
    case "Copy Password":
      await copyPassword(step, output, processResult, req);
      break;
    case "Combine String":
      await combineString(step, output, processResult, req);
      break;
    case "Get Current Date Time":
      await getCurrentDateTime(step, output, processResult, req);
      break;
    default:
      break;
  }
  if (step.screenshot) {
    await createFolder(req.database, executionHistory.id);
    canCreateS3Folder = false;
    await takeScreenshot(driver, req, step, executionHistory);
  }
  return true;
};

const launchWebsite = async (step, driver, req, stepHistory, processResult) => {
  console.log("Launching Website: " + step.testParameters.URL);
  try {
    if (step.testParameters.URL.includes("http"))
      await driver.get(step.testParameters.URL);
    else await driver.get("http://" + step.testParameters.URL);
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};

const click = async (step, driver, processResult, req) => {
  console.log("Clicking");
  try {
    await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .click();
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const doubleClick = async (step, driver, processResult, req) => {
  console.log("Double Clicking");
  try {
    await driver
      .actions()
      .doubleClick(
        await driver.findElement(
          await findByLocator(step.object.dataValues.locators)
        )
      )
      .perform();
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const hoverMouse = async (step, driver, processResult, req) => {
  console.log("Hovering Mouse");
  try {
    const el = await driver.findElement(
      await findByLocator(step.object.dataValues.locators)
    );
    await driver.actions().move({ origin: el, x: 0, y: 0 }).perform();
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const rightClick = async (step, driver, processResult, req) => {
  console.log("Right Clicking");
  try {
    await driver
      .actions()
      .contextClick(
        await driver.findElement(
          await findByLocator(step.object.dataValues.locators)
        )
      )
      .perform();
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};

const enterText = async (step, driver, processResult, req) => {
  console.log("Entering text " + text);
  try {
    const text = step.testParameters.Text;
    await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .sendKeys(text);
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const enterPassword = async (step, driver, processResult) => {
  console.log("Entering Password");
  try {
    const password = step.testParameters.Password;
    await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .sendKeys(password);
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};

const pressButton = async (step, driver, processResult, req) => {
  console.log("pressing button " + Button);
  try {
    const Button = step.testParameters.Button;
    await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .sendKeys(Key[Button]);
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const maximizeBrowser = async (driver, processResult, req) => {
  console.log("Maximize Browser");
  try {
    await driver.manage().window().maximize();
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};

const closeBrowser = async (driver, processResult, req) => {
  console.log("Browser Closed");
  try {
    await driver.quit();
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};

const refreshPage = async (driver, processResult, req) => {
  try {
    await driver.navigate().refresh();
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const generateRandomNumber = async (step, output, processResult, req) => {
  console.log("generating random number");
  try {
    const randomNumber = Math.floor(
      Math.random() * Math.pow(10, step.testParameters.Length)
    );
    output[step.testParameters.Output] = randomNumber;
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const getPageTitle = async (step, driver, output, processResult, req) => {
  console.log("Getting Page Title");
  try {
    const title = await driver.getTitle();
    output[step.testParameters.Output] = title;
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};

const clearInput = async (step, driver, processResult, req) => {
  console.log("Clearning Input");
  try {
    await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .clear();
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const scrollToObject = async (step, driver, processResult, req) => {
  console.log("Scrolling To Object");
  try {
    const element = await driver.findElement(
      await findByLocator(step.object.dataValues.locators)
    );
    await driver.executeScript("arguments[0].scrollIntoView()", element);
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};

const scrollToEnd = async (driver, processResult, req) => {
  console.log("Scrolling To End");
  try {
    await driver.executeScript("window.scrollBy(0,document.body.scrollHeight)");
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const scrollToTop = async (driver, processResult, req) => {
  console.log("Scrolling To Top");
  try {
    await driver.executeScript("window.scrollTo(0,0)");
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};

const clickByJs = async (step, driver, processResult, req) => {
  console.log("Clicking By Javascript");
  try {
    const element = await driver.findElement(
      await findByLocator(step.object.dataValues.locators)
    );
    await driver.executeScript("arguments[0].click();", element);
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};

const clickLinkByText = async (step, driver, processResult, req) => {
  console.log("Clicking Link By Text");
  try {
    await driver.findElement(By.linkText(step.testParameters.Text)).click();
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const clickLinkByPartialText = async (step, driver, processResult, req) => {
  console.log("Clicking Link By Partial Text");
  try {
    await driver
      .findElement(By.partialLinkText(step.testParameters.Text))
      .click();
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const copyText = async (step, output, processResult, req) => {
  console.log("Copying Text");
  try {
    const value = step.testParameters.Value;
    output[step.testParameters.Output] = value;
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const copyPassword = async (step, output, processResult, req) => {
  console.log("Copying Password");
  try {
    const value = step.testParameters.Password;
    output[step.testParameters.Output] = value;
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const combineString = async (step, output, processResult, req) => {
  console.log("Combining String");
  try {
    const value1 = step.testParameters.Value1;
    const value2 = step.testParameters.Value2;
    output[step.testParameters.Output] = value1 + value2;
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
const getCurrentDateTime = async (step, output, processResult, req) => {
  console.log("Getting Current Time");
  try {
    const format = step.testParameters.Format;
    const dateTime = moment(new Date()).format(format);
    output[step.testParameters.Output] = dateTime;
    return await updateStepResult(req, stepHistory.dataValues.id, true);
  } catch (err) {
    console.log(err);
    if (processResult) processResult = false;
  }
};
module.exports = { handleStep };
