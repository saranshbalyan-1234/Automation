const chromeDriver = require("selenium-webdriver");
const { until } = chromeDriver;

//totalActionEvents = 21

const { findByLocator } = require("./utils");
const implicitWait = async (step, driver) => {
  const time = Number(step.testParameters.Time);
  console.log("Waiting for " + time + " ms");
  return await driver.sleep(time);
};

const waitUntilObjectLocated = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.elementLocated(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
  } catch (err) {
    console.log(err);
  }
};
const waitUntilObjectsLocated = async (step, driver) => {
  //need fix
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.elementsLocated(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
  } catch (err) {
    console.log(err);
  }
};

const waitUntilObjectIsEnabled = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.elementIsEnabled(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
  } catch (err) {
    console.log(err);
  }
};
const waitUntilObjectIsDisabled = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.elementIsDisabled(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
  } catch (err) {
    console.log(err);
  }
};

const waitUntilObjectIsNotSelected = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.elementIsNotSelected(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
  } catch (err) {
    console.log(err);
  }
};

const waitUntilObjectIsSelected = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.elementIsSelected(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
  } catch (err) {
    console.log(err);
  }
};

const waitUntilObjectIsNotVisible = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.elementIsNotVisible(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
  } catch (err) {
    console.log(err);
  }
};

const waitUntilObjectIsVisible = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.elementIsVisible(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
  } catch (err) {
    console.log(err);
  }
};
const waitUntilObjectTextContains = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.elementTextContains(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
  } catch (err) {
    console.log(err);
  }
};
const waitUntilObjectTextIs = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.elementTextIs(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
  } catch (err) {
    console.log(err);
  }
};
const waitUntilObjectTextMatches = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.elementTextMatches(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
  } catch (err) {
    console.log(err);
  }
};
const waitUntilObjectStalenessOf = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.stalenessOf(
        await findByLocator(step.object.dataValues.locators),
        timeout
      );
    });
  } catch (err) {
    console.log(err);
  }
};
const waitUntilTitleContains = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  const string = step.testParameters.String;
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.titleContains(string, timeout);
    });
  } catch (err) {
    console.log(err);
  }
};
const waitUntilTitleIs = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  const string = step.testParameters.String;
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.titleIs(string, timeout);
    });
  } catch (err) {
    console.log(err);
  }
};
const waitUntilTitleMatches = async (step, driver) => {
  //need fix
  const timeout = Number(step.testParameters.Timeout);
  const RegEx = step.testParameters.RegEx;
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.titleMatches(RegEx, timeout);
    });
  } catch (err) {
    console.log(err);
  }
};

const waitUntilUrlContains = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  const string = step.testParameters.String;
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.urlContains(string, timeout);
    });
  } catch (err) {
    console.log(err);
  }
};
const waitUntilUrlIs = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  const string = step.testParameters.String;
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.urlIs(string, timeout);
    });
  } catch (err) {
    console.log(err);
  }
};
const waitUntilUrlMatches = async (step, driver) => {
  //need fix
  const timeout = Number(step.testParameters.Timeout);
  const RegEx = step.testParameters.RegEx;
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.urlMatches(RegEx, timeout);
    });
  } catch (err) {
    console.log(err);
  }
};
const waitUntilAlertIsPresent = async (step, driver) => {
  //need fix
  const timeout = Number(step.testParameters.Timeout);
  const RegEx = step.testParameters.RegEx;
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.alertIsPresent(RegEx, timeout);
    });
  } catch (err) {
    console.log(err);
  }
};
const waitUntilAbleToSwitchToFrame = async (step, driver) => {
  //need fix
  const timeout = Number(step.testParameters.Timeout);
  const RegEx = step.testParameters.RegEx;
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.ableToSwitchToFrame(RegEx, timeout);
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  implicitWait,
  waitUntilObjectLocated,
  waitUntilObjectsLocated,
  waitUntilObjectIsEnabled,
  waitUntilObjectIsDisabled,
  waitUntilObjectIsNotSelected,
  waitUntilObjectIsSelected,
  waitUntilObjectIsNotVisible,
  waitUntilObjectIsVisible,
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
  waitUntilAlertIsPresent,
  waitUntilAbleToSwitchToFrame,
};
