const handleStep = async (step, driver) => {
  console.log(step.actionEvent);
  switch (step.actionEvent) {
    case "Launch Website":
      launchWebsite(step, driver);
      break;
    default:
  }
  return true;
};
const launchWebsite = async (step, driver) => {
  try {
    if (step.testParameters.URL.includes("http"))
      await driver.get(step.testParameters.URL);
    else await driver.get("http://" + step.testParameters.URL);
    return true;
  } catch (err) {
    console.log(err);
  }
};
module.exports = { handleStep };
