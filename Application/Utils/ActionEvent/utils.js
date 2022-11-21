const chromeDriver = require("selenium-webdriver");
const { By } = chromeDriver;
const { uploadFile } = require("../../Controllers/awsController");
const findByLocator = async (locators) => {
  // ClassName
  // CSS
  // Id
  // JS
  // LinkText
  // Name
  // PartialLinkText
  // TagName
  // XPATH

  for (const el of locators) {
    try {
      const type = el.dataValues.type;
      const locator = el.dataValues.locator;
      console.log(`Locating by ${type}: ${locator}`);
      if (type == "XPATH") {
        return By.xpath(locator);
      } else if (type == "ClassName") {
        return By.className(locator);
      } else if (type == "CSS") {
        return By.css(locator);
      } else if (type == "LinkText") {
        return By.linkText(locator);
      } else if (type == "PartialLinkText") {
        return By.partialLinkText(locator);
      } else if (type == "name") {
        return By.name(locator);
      } else if (type == "Id") {
        return By.id(locator);
      } else if (type == "TagName") {
        return By.tagName(locator);
      } else if (type == "JS") {
        return By.js(locator);
      }
    } catch (err) {
      console.log(err);
    }
  }
};
const takeScreenshot = async (driver, req, step, executionHistory) => {
  console.log("Taking screenshot");
  await driver.takeScreenshot().then(async (data, err) => {
    if (err) return console.log("error in taking screenshot", err);

    var buf = Buffer.from(
      data.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    // console.log(data);
    const fileName = `${executionHistory.id}/${step.id}`;
    await uploadFile(buf, req.database, fileName);
  });
};

module.exports = { findByLocator, takeScreenshot };
