const chromeDriver = require("selenium-webdriver");
const { findByLocator, handleActionEventError } = require("./utils");
const fs = require("fs");
const { By } = chromeDriver;
const moment = require("moment");
const {
  ConvertToString,
  ConvertToNumber,
  ConvertToDateTime,
  ConvertToInteger,
  ConvertToFloat,
  ConvertToHex,
} = require("./convert");
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
  waitUntilAbleToSwitchToFrame,
} = require("./wait");
const {
  waitUntilAlertPresent,
  acceptAlert,
  dismissAlert,
  enterTextInAlert,
  getAlertMessage,
} = require("./alert");
const { If, Else, EndCondition } = require("./ifElse");

const {
  updateStepResult,
} = require("../../Controllers/executionHistoryController");
const { Key } = chromeDriver;

const handleStep = async (
  step,
  driver,
  output,
  req,
  stepHistoryId,
  processResult,
  executionHistory,
  stepExtra
) => {
  switch (step.actionEvent) {
    case "Launch Website":
      return await launchWebsite(
        step,
        driver,
        req,
        stepHistoryId,
        processResult,
        executionHistory
      );
      break;
    case "Click":
      return await click(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Double Click":
      return await doubleClick(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Right Click":
      return await rightClick(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Enter Text":
      return await enterText(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Clear Input":
      return await clearInput(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Enter Password":
      return await enterPassword(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Press Button":
      return await pressButton(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Maximize Browser":
      return await await maximizeBrowser(
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Close Browser":
      return await closeBrowser(
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
    case "Wait":
      return await implicitWait(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Object Located":
      return await waitUntilObjectLocated(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Objects Located":
      return await waitUntilObjectsLocated(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Object Enabled":
      return await waitUntilObjectEnabled(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Object Disabled":
      return await waitUntilObjectDisabled(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Object Selected":
      return await waitUntilObjectSelected(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Object Not Selected":
      return await waitUntilObjectNotSelected(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Object Visible":
      return await waitUntilObjectVisible(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Object Not Visible":
      return await waitUntilObjectNotVisible(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Alert Present":
      return await waitUntilAlertPresent(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Accept Alert":
      return await acceptAlert(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Dismiss Alert":
      return await dismissAlert(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Get Alert Message":
      return await getAlertMessage(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory,
        output
      );
      break;
    case "Enter Text In Alert":
      return await enterTextInAlert(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Object Text Contains":
      return await waitUntilObjectTextContains(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Object Text Is":
      return await waitUntilObjectTextIs(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Object Text Matches":
      return await waitUntilObjectTextMatches(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Title Contains":
      return await waitUntilTitleContains(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Title Is":
      return await waitUntilTitleIs(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Title Matches":
      return await waitUntilTitleMatches(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Url Contains":
      return await waitUntilUrlContains(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Url Is":
      return await waitUntilUrlIs(
        step,
        driver,
        processResult,
        req,
        stepHistoryId
      );
      break;
    case "Wait Until Url Matches":
      return await waitUntilUrlMatches(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Object Staleness Of":
      return await waitUntilObjectStalenessOf(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Able To Switch Frame":
      return await waitUntilAbleToSwitchToFrame(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Refresh Page":
      return await refreshPage(
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Generate Random Number":
      return await generateRandomNumber(
        step,
        output,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Get Page Title":
      return await getPageTitle(
        step,
        driver,
        output,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Console Log":
      return await printLog(
        step.testParameters.Value,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Scroll To Object":
      return await scrollToObject(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Scroll To End":
      return await scrollToEnd(
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Scroll To Top":
      return await scrollToTop(
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Click By Javascript":
      return await clickByJs(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Click Link By Text":
      return await clickLinkByText(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Click Link By Partial Text":
      return await clickLinkByPartialText(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Hover Mouse":
      return await hoverMouse(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Copy Text":
      return await copyText(
        step,
        output,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Copy Substring":
      return await copySubstring(
        step,
        output,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Copy Password":
      return await copyPassword(
        step,
        output,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Combine String":
      return await combineString(
        step,
        output,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Get Current Date Time":
      return await getCurrentDateTime(
        step,
        output,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "If":
      return await If(
        step,
        processResult,
        req,
        stepHistoryId,
        stepExtra,
        executionHistory
      );
      break;
    case "Else If":
      return await If(
        step,
        processResult,
        req,
        stepHistoryId,
        stepExtra,
        executionHistory
      );
      break;
    case "Else":
      return await Else(
        processResult,
        req,
        stepHistoryId,
        stepExtra,
        executionHistory
      );
      break;
    case "End Condition":
      return await EndCondition(
        processResult,
        req,
        stepHistoryId,
        stepExtra,
        executionHistory
      );
      break;
    case "Collect Text":
      return await collectText(
        step,
        driver,
        output,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Collect Object CSS Property":
      return await collectObjectCSSProperty(
        step,
        driver,
        output,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Collect Object Property":
      return await collectObjectProperty(
        step,
        driver,
        output,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Convert To String":
      return await ConvertToString(
        step,
        processResult,
        req,
        stepHistoryId,
        executionHistory,
        output
      );
      break;
    case "Convert To Number":
      return await ConvertToNumber(
        step,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Convert To DateTime":
      return await ConvertToDateTime(
        step,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Convert To Integer":
      return await ConvertToInteger(
        step,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Convert To Float":
      return await ConvertToFloat(
        step,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Convert To Hex":
      return await ConvertToHex(
        step,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Select Option By Value":
      return await selectOptionByValue(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Select Option By Position":
      return await selectOptionByPosition(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Switch To Frame":
      return await switchToFrame(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Switch To Default Frame":
      return await switchToDefaultFrame(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Collect Cell Value From Table":
      return await collectCellValueFromTable(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory,
        output
      );
      break;
    case "Upload File":
      return await uploadFile(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    default:
      break;
  }
  // if (step.screenshot) {
  //   await createFolder(req.database, executionHistory.id);
  //   canCreateS3Folder = false;
  //   await takeScreenshot(driver, req, step, executionHistory.id);
  // }
};

const launchWebsite = async (
  step,
  driver,
  req,
  stepHistoryId,
  processResult,
  executionHistory
) => {
  console.log("Launching Website: " + step.testParameters.URL);
  try {
    if (step.testParameters.URL.includes("http"))
      await driver.get(step.testParameters.URL);
    else await driver.get("http://" + step.testParameters.URL);
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

const click = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Clicking");
  try {
    await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .click();
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const doubleClick = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
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
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const hoverMouse = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Hovering Mouse");
  try {
    const el = await driver.findElement(
      await findByLocator(step.object.dataValues.locators)
    );
    await driver.actions().move({ origin: el, x: 0, y: 0 }).perform();
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const rightClick = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
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
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

const enterText = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Entering text ");
  const text = step.testParameters.Text;
  if (!text) {
    console.log("No Text Found");
    if (processResult.result) {
      processResult.result = false;
    }
    return await updateStepResult(req, stepHistoryId, false);
  }

  try {
    await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .sendKeys(text);
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const enterPassword = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Entering Password");
  try {
    const password = step.testParameters.Password;
    if (!password) {
      console.log("No Password Found");
      if (processResult.result) {
        processResult.result = false;
      }
      return await updateStepResult(req, stepHistoryId, false);
    }
    await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .sendKeys(password);
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

const pressButton = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  const Button = step.testParameters.Button;
  console.log("pressing button " + Button);
  try {
    await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .sendKeys(Key[Button]);
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const maximizeBrowser = async (
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Maximize Browser");
  try {
    await driver.manage().window().maximize();
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

const closeBrowser = async (
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Browser Closed");
  try {
    await driver.quit();
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

const refreshPage = async (
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  try {
    await driver.navigate().refresh();
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const generateRandomNumber = async (
  step,
  output,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("generating random number");
  try {
    const randomNumber = Math.floor(
      Math.random() * Math.pow(10, step.testParameters.Length)
    );
    output[step.testParameters.Output] = randomNumber;
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const getPageTitle = async (
  step,
  driver,
  output,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Getting Page Title");
  try {
    const title = await driver.getTitle();
    output[step.testParameters.Output] = title;
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

const clearInput = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Clearning Input");
  try {
    await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .clear();
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const scrollToObject = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Scrolling To Object");
  try {
    const element = await driver.findElement(
      await findByLocator(step.object.dataValues.locators)
    );
    await driver.executeScript("arguments[0].scrollIntoView()", element);
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

const scrollToEnd = async (
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Scrolling To End");
  try {
    await driver.executeScript("window.scrollBy(0,document.body.scrollHeight)");
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const scrollToTop = async (
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Scrolling To Top");
  try {
    await driver.executeScript("window.scrollTo(0,0)");
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

const clickByJs = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Clicking By Javascript");
  try {
    const element = await driver.findElement(
      await findByLocator(step.object.dataValues.locators)
    );
    await driver.executeScript("arguments[0].click();", element);
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

const clickLinkByText = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log(`Clicking Link By Text ${step.testParameters.Text}`);
  try {
    await driver.findElement(By.linkText(step.testParameters.Text)).click();
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const clickLinkByPartialText = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Clicking Link By Partial Text");
  try {
    await driver
      .findElement(By.partialLinkText(step.testParameters.Text))
      .click();
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const copyText = async (
  step,
  output,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Copying Text");
  try {
    const value = step.testParameters.Value;
    output[step.testParameters.Output] = value;
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const copySubstring = async (
  step,
  output,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Copying Substring");
  try {
    const value = step.testParameters.Value;
    const start = parseInt(step.testParameters.StartIndex);
    const end = parseInt(step.testParameters.EndIndex);
    const newValue = value.substring(start, end);
    output[step.testParameters.Output] = newValue;
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const copyPassword = async (
  step,
  output,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Copying Password");
  try {
    const value = step.testParameters.Password;
    output[step.testParameters.Output] = value;
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const combineString = async (
  step,
  output,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Combining String");
  try {
    const value1 = step.testParameters.Value1;
    const value2 = step.testParameters.Value2;
    output[step.testParameters.Output] = value1 + value2;
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const getCurrentDateTime = async (
  step,
  output,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Getting Current Time");
  try {
    const format = step.testParameters.Format;
    const dateTime = moment(new Date()).format(format);
    output[step.testParameters.Output] = dateTime;
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

const collectText = async (
  step,
  driver,
  output,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Collecting Text");
  try {
    const text = await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .getText();
    output[step.testParameters.Output] = text;

    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const collectObjectCSSProperty = async (
  step,
  driver,
  output,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Collecting Object CSS Property");
  try {
    const attribute = await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .getCssValue(step.testParameters.Attribute);
    output[step.testParameters.Output] = attribute;
    console.log(attribute);

    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const collectObjectProperty = async (
  step,
  driver,
  output,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Collecting Object Property");
  try {
    const attribute = await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .getAttribute(step.testParameters.Attribute);
    output[step.testParameters.Output] = attribute;
    console.log(attribute);
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const printLog = async (
  value,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  try {
    console.log("Log: " + value);
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

const selectOptionByValue = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Selecting Option By Value");
  const value = step.testParameters.Value;
  if (!value) {
    console.log("No Value Found");
    if (processResult.result) {
      processResult.result = false;
    }
    return await updateStepResult(req, stepHistoryId, false);
  }

  try {
    // other possible solution => #select > option[value=saransh]
    await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .sendKeys(value);
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

const selectOptionByPosition = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Selecting Option By Position");
  let position = parseInt(step.testParameters.Position);
  if (!position) {
    console.log("Invalid Position Found");
    if (processResult.result) {
      processResult.result = false;
    }
    return await updateStepResult(req, stepHistoryId, false);
  }
  try {
    const select = await driver.findElement(
      await findByLocator(step.object.dataValues.locators)
    );
    const options = await select.findElements(
      await findByLocator([
        {
          dataValues: { type: "TagName", locator: "option" },
        },
      ])
    );
    await options[position - 1].click();

    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

const switchToFrame = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Switching To Frame");

  try {
    const element = await driver.findElement(
      await findByLocator(step.object.dataValues.locators)
    );
    await driver.switchTo().frame(element);
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};
const switchToDefaultFrame = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Switching To Default Frame");

  try {
    await driver.switchTo().defaultContent();
    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

const collectCellValueFromTable = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory,
  output
) => {
  console.log("Collecting Cell Value From Table");
  let row = parseInt(step.testParameters.Row);
  let column = parseInt(step.testParameters.Column) - 1;
  if (isNaN(row) || isNaN(column)) {
    console.log("Invalid Position Found");
    if (processResult.result) {
      processResult.result = false;
    }
    return await updateStepResult(req, stepHistoryId, false);
  }
  try {
    const table = await driver.findElement(
      await findByLocator(step.object.dataValues.locators)
    );
    const rows = await table.findElements(
      await findByLocator([
        {
          dataValues: { type: "TagName", locator: "tr" },
        },
      ])
    );
    const col = await rows[row].findElements(
      await findByLocator([
        {
          dataValues: { type: "TagName", locator: "td" },
        },
      ])
    );
    const cell = await col[column].getText();
    output[step.testParameters.Output] = cell;

    return await updateStepResult(req, stepHistoryId, true);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

const uploadFile = async (
  step,
  driver,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  try {
    const path = step.testParameters.Path;
    console.log("Uploading File" + path);

    let newPath = "";
    let oldPath = process.execPath.split("/");
    oldPath[oldPath.length - 1] = path;
    newPath = oldPath.join("/");

    //  newPath= process.cwd() + path;

    await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .sendKeys(newPath);
  } catch (err) {
    return await handleActionEventError(
      err,
      req,
      stepHistoryId,
      processResult,
      executionHistory.continueOnError
    );
  }
};

module.exports = { handleStep };
