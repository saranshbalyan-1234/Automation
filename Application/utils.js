const chrome = require("selenium-webdriver/chrome");

// var capabilities = {
//   browserName: "Chrome",
//   browser_version: "81.0",
//   os: "Windows",
//   os_version: "10",
//   resolution: "1024x768",
//   "browserstack.user": "USERNAME",
//   "browserstack.key": "ACCESS_KEY",
//   name: "Bstack-[Node] Sample Test",
// };

const createDriver = async (req, res) => {
  try {
    return createLocalDriver();
    // return createApplicationDriver();
  } catch (e) {
    console.log(e);
    let error = "";
    let stringError = String(e);
    if (stringError.includes("Server was killed with SIGKILL")) {
      error = "System permission issue!";
    } else if (
      stringError.includes("This version of ChromeDriver only supports")
    ) {
      error = "Invalid ChromeDriver version!";
    } else if (
      stringError.includes("The specified executable path does not exist: ")
    ) {
      error = "Chromedriver not found!";
    }
    return res.status(400).json(error ? error : String(e));
  }
};

const createLocalDriver = () => {
  let newExecutablePath = "";
  newExecutablePath = process.cwd() + "/chromedriver";

  let service = new chrome.ServiceBuilder(newExecutablePath).build();

  let options = new chrome.Options();

  return chrome.Driver.createSession(options, service);
};

const createApplicationDriver = () => {
  let newExecutablePath = "";
  let executablePath = process.execPath.split("/");
  executablePath[executablePath.length - 1] = "chromedriver";
  newExecutablePath = executablePath.join("/");

  let service = new chrome.ServiceBuilder(newExecutablePath).build();

  let options = new chrome.Options();

  return chrome.Driver.createSession(options, service);
};

module.exports = { createDriver };
