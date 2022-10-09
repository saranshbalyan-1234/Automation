import joi from "@hapi/joi";

const projectByIdValidation = joi.object({
  projectId: joi.number().integer().required(),
});

const addProjectValidation = joi.object({
  name: joi.string().min(3).required(),
  description: joi.string(),
  startDate: joi.string().required(),
  endDate: joi.string().required(),
});

const memberProjectValidation = joi.object({
  projectId: joi.number().integer().required(),
  userId: joi.number().integer().required(),
});

export { projectByIdValidation, addProjectValidation, memberProjectValidation };
