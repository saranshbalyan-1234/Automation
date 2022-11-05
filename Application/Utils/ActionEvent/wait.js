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

const waitUntilObjectEnabled = async (step, driver) => {
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
const waitUntilObjectDisabled = async (step, driver) => {
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

const waitUntilObjectNotSelected = async (step, driver) => {
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

const waitUntilObjectSelected = async (step, driver) => {
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

const waitUntilObjectNotVisible = async (step, driver) => {
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

const waitUntilObjectVisible = async (step, driver) => {
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
  const string = step.testParameters.string;
  const timeout = Number(step.testParameters.Timeout);
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.elementTextContains(string, timeout);
    });
  } catch (err) {
    console.log(err);
  }
};
const waitUntilObjectTextIs = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  const string = step.testParameters.string;
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.elementTextIs(string, timeout);
    });
  } catch (err) {
    console.log(err);
  }
};
const waitUntilObjectTextMatches = async (step, driver) => {
  const timeout = Number(step.testParameters.Timeout);
  const RegEx = new RegExp(step.testParameters.RegEx);
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.elementTextMatches(RegEx, timeout);
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
  const timeout = Number(step.testParameters.Timeout);
  const RegEx = new RegExp(step.testParameters.RegEx);
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
  const timeout = Number(step.testParameters.Timeout);
  const RegEx = new RegExp(step.testParameters.RegEx);
  console.log("Waiting for " + timeout + " ms");
  try {
    return await driver.wait(async () => {
      return until.urlMatches(RegEx, timeout);
    });
  } catch (err) {
    console.log(err);
  }
};
const waitUntilAlertPresent = async (step, driver) => {
  const temp = Number(step.testParameters.Timeout);
  const timeout = temp > 1000 ? temp : 1000;
  console.log("Waiting for " + timeout + " ms");
  for (var i = 0; i < timeout; i = i + 1000) {
    try {
      await driver.sleep(1000);
      return await driver.wait(async () => {
        return await driver.switchTo().alert();
      });
    } catch (err) {}
  }
  console.log("Alter Not Found");
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
};
