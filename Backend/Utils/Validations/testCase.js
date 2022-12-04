import joi from "@hapi/joi";

const updateTestCaseValidation = joi.object({
  name: joi.string().min(3).max(30).required(),
  tags: joi.array().allow(null, ""),
  description: joi.string().allow(null, ""),
  testCaseId: joi.number().integer().required(),
});
export { updateTestCaseValidation };
