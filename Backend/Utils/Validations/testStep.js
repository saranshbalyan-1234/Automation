import joi from "@hapi/joi";

export const saveTestStepValidation = joi.object({
  processId: joi.number().integer(),
  objectId: joi.number().integer(),
  reusableProcessId: joi.number().integer(),
  step: joi.number().integer().required(),
  parameters: joi.array().allow(null),
  screenshot: joi.boolean().required(),
  comment: joi.string().allow(null, ""),
  actionEvent: joi.string().required(),
});

export const updateTestStepValidation = joi.object({
  testStepId: joi.number().integer().required(),
  objectId: joi.number().integer(),
  parameters: joi.array().allow(null),
  screenshot: joi.boolean().required(),
  comment: joi.string().allow(null, ""),
  actionEvent: joi.string().required(),
});

export const testStepIdValidation = joi.object({
  testStepId: joi.number().integer().required(),
});
