import joi from "@hapi/joi";

const saveTestCaseValidation = joi.object({
  name: joi.string().min(3).max(30).required(),
  description: joi.string().allow(null, ""),
  tags: joi.array().allow(null, ""),
  projectId: joi.number().integer().required(),
});
const updateTestCaseValidation = joi.object({
  name: joi.string().min(3).max(30).required(),
  tags: joi.array().allow(null, ""),
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
