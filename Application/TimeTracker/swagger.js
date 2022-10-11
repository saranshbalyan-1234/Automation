import swaggerAutogen from "swagger-autogen";

swaggerAutogen();

const outputFile = "./swagger.json";
const endpointsFiles = ["./index.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "Automation And Manual",
    description:
      "Automation: TestCase, TestExecution <br/> Manual: Release, Defects",
  },
  host: "localhost:3001",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Enter your Bearer Token",
    },
  },
};

swaggerAutogen(outputFile, endpointsFiles, doc);
