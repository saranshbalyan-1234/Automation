import joi from "@hapi/joi";

export const reusableProcessIdValidation = joi.object({
  reusableProcessId: joi.number().integer().required(),
});
export const updateReusableProcessValidation = joi.object({
  name: joi.string().min(3).max(30).required(),
  tags: joi.array().allow(null, ""),
  description: joi.string().allow(null, ""),
  reusableProcessId: joi.number().integer().required(),
});
