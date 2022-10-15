import joi from "@hapi/joi";

const nameValidation = joi.object({
  name: joi.string().min(3).required(),
});

export { nameValidation };
