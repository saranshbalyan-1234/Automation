import child_process from "child_process";

export const handleChromeDriver = () => {
  child_process.execSync("npm install chromedriver");
};
