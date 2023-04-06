const chrome = require("selenium-webdriver/chrome");

const createDriver = async (req, res) => {
  try {
    return createLocalDriver(req);
    // return createApplicationDriver(req);
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
    return res.status(400).json({ error: error ? error : String(e) });
  }
};

const createLocalDriver = (req) => {
  let newExecutablePath = "";
  newExecutablePath = process.cwd() + "/chromedriver";

  let service = new chrome.ServiceBuilder(newExecutablePath).build();

  let options = new chrome.Options();

  if (req.body.headless) options.addArguments("--headless");
  options.addArguments("start-maximized");
  options.addArguments("disable-infobars");
  options.addArguments("--disable-extensions");
  options.addArguments("--no-sandbox");
  options.addArguments("--disable-application-cache");
  options.addArguments("--disable-gpu");
  options.addArguments("--disable-dev-shm-usage");

  return chrome.Driver.createSession(options, service);
};

const createApplicationDriver = (req) => {
  let newExecutablePath = "";
  let executablePath = process.execPath.split("/");
  executablePath[executablePath.length - 1] = "chromedriver";
  newExecutablePath = executablePath.join("/");

  let service = new chrome.ServiceBuilder(newExecutablePath).build();

  let options = new chrome.Options();
  if (req.body.headless) options.addArguments("--headless");
  options.addArguments("--no-sandbox");
  return chrome.Driver.createSession(options, service);
};

module.exports = { createDriver };
