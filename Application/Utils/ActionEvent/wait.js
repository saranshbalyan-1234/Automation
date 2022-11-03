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

module.exports = {
  implicitWait,
  waitUntilObjectLocated,
  waitUntilObjectIsEnabled,
  waitUntilObjectIsDisabled,
};
