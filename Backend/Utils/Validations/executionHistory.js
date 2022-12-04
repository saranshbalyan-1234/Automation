import joi from "@hapi/joi";

export const executionHistoryIdValidation = joi.object({
  executionHistoryId: joi.number().integer().required(),
});
