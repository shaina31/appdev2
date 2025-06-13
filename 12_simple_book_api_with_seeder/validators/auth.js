// validators/auth.js
const Joi = require('joi');

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const signinSchema = Joi.object({
  usernameOrEmail: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  signupSchema,
  signinSchema,
};
