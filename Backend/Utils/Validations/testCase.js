import joi from "@hapi/joi";

const saveTestCaseValidation = joi.object({
  name: joi.string().min(3).required(),
  projectId: joi.number().integer().required(),
});
const updateTestCaseValidation = joi.object({
  name: joi.string().min(3).required(),
  testCaseId: joi.number().integer().required(),
});
const testCaseIdValidation = joi.object({
  testCaseId: joi.number().integer().required(),
});
export {
  saveTestCaseValidation,
  updateTestCaseValidation,
  testCaseIdValidation,
};
