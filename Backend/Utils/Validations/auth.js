import joi from "@hapi/joi";
const loginValidation = joi.object({
  email: joi.string().min(5).required().email(),
  password: joi.string().min(5).max(15).required(),
  rememberMe: joi.boolean().required(),
});
const registerValidation = joi.object({
  name: joi.string().min(3).max(30).required(),
  email: joi.string().min(5).required().email(),
  password: joi.string().min(8).max(15).required(),
});
export { loginValidation, registerValidation };
