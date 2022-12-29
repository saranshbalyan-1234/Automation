import joi from "@hapi/joi";

export const nameTestCaseId = joi.object({
  name: joi.string().min(3).max(30).required(),
  testCaseId: joi.number().integer().required(),
});
export const updateColumnValidation = joi.object({
  name: joi.string().min(3).max(30).required(),
  value: joi.string().min(3).max(30).required(),
  envId: joi.number().integer().required(),
});
