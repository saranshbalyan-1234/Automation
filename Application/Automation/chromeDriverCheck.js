const findChromeVersion = require("find-chrome-version");
const { findChromeDriverVersion } = require("find-chrome-driver-version");

const example = async () => {
  const chromeVersion = await findChromeVersion();
  const chromeDriverVersion = await findChromeDriverVersion();
  console.log(`Chrome version: ${chromeVersion}`);
  console.log(`Chrome Driver version: ${chromeDriverVersion}`);
};
example();
