import joi from "@hapi/joi";

const nameValidation = joi.object({
  name: joi.string().min(3).required(),
});
const updateNameValidation = joi.object({
  name: joi.string().min(3).required(),
  roleId: joi.number().integer().required(),
});
const roleIdValidation = joi.object({
  roleId: joi.number().integer().required(),
});

const updatePermissionValidation = joi.object({
  name: joi.string().min(3).required(),
  add: joi.boolean().required(),
  edit: joi.boolean().required(),
  view: joi.boolean().required(),
  delete: joi.boolean().required(),
});

export {
  nameValidation,
  updateNameValidation,
  roleIdValidation,
  updatePermissionValidation,
};
