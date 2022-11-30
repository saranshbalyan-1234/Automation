import joi from "@hapi/joi";

const nameValidation = joi.object({
  name: joi.string().min(3).max(30).required(),
});

export { nameValidation };
