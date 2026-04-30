import Joi from 'joi';

export default {
  login: Joi.object({
    email: Joi.string().email().required(),
    password:Joi.string().min(4).max(32).required(),
  }),

  register: Joi.object({
    name: Joi.string().alphanum().required(),
    age: Joi.number().integer().min(10).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(32).required(),
  }),

  update: Joi.object({
    name: Joi.string().alphanum().required(),
    age: Joi.number().integer().min(10).max(100).required(),
  }),
}