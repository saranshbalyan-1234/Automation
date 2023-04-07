const chromeDriver = require("selenium-webdriver");
const { findByLocator, handleActionEventError } = require("./utils");
const { By } = chromeDriver;
const {
  ConvertToString,
  ConvertToNumber,
  ConvertToDateTime,
  ConvertToInteger,
  ConvertToFloat,
  ConvertToHex,
} = require("./convert");
const {
  validateObjectTextIncludes,
  validateObjectTextNotIncludes,
  validateObjectTextEquals,
  validateObjectEnabled,
  validateObjectSelected,
} = require("./validate");
const {
  refreshPage,
  backPage,
  forwardPage,
  newTab,
  newWindow,
  closeBrowser,
  maximizeBrowser,
  switchToTab,
  switchToDefaultTab,
} = require("./browser");
const {
  enterDateTime,
  getCurrentDateTime,
  getDateTime,
  addDateTime,
  subtractDateTime,
} = require("./dateTime");
const {
  collectObjectText,
  collectObjectCSSProperty,
  collectObjectProperty,
  scrollToObject,
} = require("./object");
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
  waitUntilObjectClickable,
  waitUntilObjectNotClickable,
} = require("./wait");
const {
  waitUntilAlertPresent,
  acceptAlert,
  dismissAlert,
  enterTextInAlert,
  getAlertMessage,
} = require("./alert");
const {
  If,
  Else,
  EndCondition,
  IfObjectVisible,
  IfObjectTextIncludes,
  IfObjectTextNotIncludes,
  IfObjectTextEquals,
  ifObjectEnabled,
  ifObjectSelected,
} = require("./ifElse");
const {
  click,
  clickByJs,
  clickLinkByPartialText,
  clickLinkByText,
  rightClick,
  doubleClick,
  clickElementByProperty,
} = require("./click");

const {
  updateStepResult,
} = require("../Controllers/executionHistoryController");
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
    case "Click Element By Property":
      return await clickElementByProperty(
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
    case "Enter Date Time":
      return await enterDateTime(
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
    case "Switch To Tab":
      return await switchToTab(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Switch To Default Tab":
      return await switchToDefaultTab(
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
    case "Wait Until Object Clickable":
      return await waitUntilObjectClickable(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Wait Until Object Not Clickable":
      return await waitUntilObjectNotClickable(
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
    case "Back Page":
      return await backPage(
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Forward Page":
      return await forwardPage(
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "New Tab":
      return await newTab(
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "New Window":
      return await newWindow(
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
    case "Generate Random String":
      return await generateRandomString(
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
    case "Get Page URL":
      return await getPageUrl(
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
    case "If Object Enabled":
      return await ifObjectEnabled(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory,
        stepExtra
      );
      break;
    case "If Object Selected":
      return await ifObjectSelected(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory,
        stepExtra
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
    case "Collect Object Text":
      return await collectObjectText(
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
    case "Get Date Time":
      return await getDateTime(
        step,
        processResult,
        req,
        stepHistoryId,
        executionHistory,
        output
      );
      break;
    case "Add Date Time":
      return await addDateTime(
        step,
        processResult,
        req,
        stepHistoryId,
        executionHistory,
        output
      );
      break;
    case "Subtract Date Time":
      return await subtractDateTime(
        step,
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
    case "If Object Visible":
      return await IfObjectVisible(step, driver, req, stepHistoryId, stepExtra);
      break;
    case "If Object Text Includes":
      return await IfObjectTextIncludes(
        step,
        driver,
        req,
        stepHistoryId,
        executionHistory,
        stepExtra
      );
      break;
    case "If Object Text Not Includes":
      return await IfObjectTextNotIncludes(
        step,
        driver,
        req,
        stepHistoryId,
        executionHistory,
        stepExtra
      );
      break;
    case "If Object Text Equals":
      return await IfObjectTextEquals(
        step,
        driver,
        req,
        stepHistoryId,
        executionHistory,
        stepExtra
      );
      break;
    case "Validate Object Text Includes":
      return await validateObjectTextIncludes(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Validate Object Text Not Includes":
      return await validateObjectTextNotIncludes(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Validate Object Text Equals":
      return await validateObjectTextEquals(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Validate Object Selected":
      return await validateObjectSelected(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Validate Object Enabled":
      return await validateObjectEnabled(
        step,
        driver,
        processResult,
        req,
        stepHistoryId,
        executionHistory
      );
      break;
    case "Calculate And Store":
      return await calculateAndStore(
        step,
        processResult,
        req,
        stepHistoryId,
        executionHistory,
        output
      );
      break;
    case "Throw Error":
      return await throwError(
        step,
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
    const length = step.testParameters.Length;
    let randomNumber = null;

    const generateNumber = async () => {
      randomNumber = Math.floor(Math.random() * Math.pow(10, length));
      if (String(randomNumber).length != length) return generateNumber();
    };

    generateNumber();
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
const generateRandomString = async (
  step,
  output,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("generating random string");
  try {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = step.testParameters.Length;
    let randomString = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }

    output[step.testParameters.Output] = randomString;

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
const getPageUrl = async (
  step,
  driver,
  output,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Getting Page URL");
  try {
    const title = await driver.getCurrentUrl();
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
    // other possible solution => #select > option[value=value]
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
    console.log("Uploading File " + path);

    let newPath = "";
    let oldPath = process.execPath.split("/");
    oldPath[oldPath.length - 1] = path;
    newPath = oldPath.join("/");

    //  newPath= process.cwd() + path;

    if (newPath[0] !== "/") newPath = newPath + "/";

    await driver
      .findElement(await findByLocator(step.object.dataValues.locators))
      .sendKeys(newPath);
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

const calculateAndStore = async (
  step,
  processResult,
  req,
  stepHistoryId,
  executionHistory,
  output
) => {
  try {
    const value1 = step.testParameters.Value1;
    const value2 = step.testParameters.Value2;
    const operand = step.testParameters.Operand;

    console.log("Calculating " + value1 + " " + value2 + " with " + operand);
    const result = eval(value1 + operand + value2);

    output[step.testParameters.Output] = result;

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

const throwError = async (
  step,
  processResult,
  req,
  stepHistoryId,
  executionHistory
) => {
  console.log("Throwing Error");
  try {
    const message = step.testParameters.Message;
    throw new Error(message);
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
