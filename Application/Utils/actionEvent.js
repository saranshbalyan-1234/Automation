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
    default:
      return true;
  }
  return true;
};
const launchWebsite = async (step, driver) => {
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
  return await driver.sleep(time);
};
module.exports = { handleStep };
