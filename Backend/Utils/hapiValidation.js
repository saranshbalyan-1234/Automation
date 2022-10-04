import joi from "@hapi/joi";

const registerValidation = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().min(5).required().email(),
  password: joi.string().min(8).required(),
});

const resendVerificationMailValidation = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().min(5).required().email(),
});
const loginValidation = joi.object({
  email: joi.string().min(5).required().email(),
  password: joi.string().min(5).required(),
  rememberMe: joi.boolean().required(),
});
const changePasswordValidation = joi.object({
  oldPassword: joi.string().min(5).required(),
  newPassword: joi.string().min(5).required(),
});

const changeDetailsValidation = joi.object({
  name: joi.string(),
  defaultProjectId: joi.number().integer(),
});
const activeInactiveValidation = joi.object({
  userId: joi.number().integer().required(),
  active: joi.boolean().required(),
});
export {
  registerValidation,
  loginValidation,
  changePasswordValidation,
  changeDetailsValidation,
  activeInactiveValidation,
  resendVerificationMailValidation,
};
