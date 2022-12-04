import joi from "@hapi/joi";

export const updateTestCaseValidation = joi.object({
  name: joi.string().min(3).max(30).required(),
  tags: joi.array().allow(null, ""),
  description: joi.string().allow(null, "").required(),
  testCaseId: joi.number().integer().required(),
});

export const saveProcesValidation = joi.object({
  step: joi.number().integer().required(),
  name: joi.string().min(3).max(30).required(),
  comment: joi.string().allow(null, "").required(),
  testCaseId: joi.number().integer().required(),
});

export const updateProcessValidation = joi.object({
  name: joi.string().min(3).max(30).required(),
  comment: joi.string().allow(null, "").required(),
  processId: joi.number().integer().required(),
});
