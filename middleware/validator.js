const { Joi } = require('express-validation');

const createCustomerValidation = {
  query: Joi.object({
    name: Joi.string()
      .required(),
    email: Joi.string()
      .email()
      .required(),
    telephone: Joi.string()
      .required(),
  }),
};
const createSystemValidation = {
  query: Joi.object({
    customerId: Joi.string()
      .required(),
    name: Joi.string()
      .required(),
    description: Joi.string()
      .allow(),
  }),
};
const listSystemByCustomerValidation = {
  query: Joi.object({
    customerId: Joi.string()
      .required(),
  }),
};
const createTagValidation = {
  query: Joi.object({
    systemId: Joi.string()
      .required(),
    name: Joi.string()
      .required(),
    description: Joi.string()
      .allow(),
  }),
};
const createTagValueValidation = {
  query: Joi.object({
    tagId: Joi.string()
      .required(),
    value: Joi.string()
      .allow(),
  }),
};
const getLastTagValueValidation = {
  query: Joi.object({
    tagId: Joi.string()
      .required(),
    value: Joi.string()
      .allow(),
  }),
};

module.exports = {
  createCustomerValidation,
  createSystemValidation,
  listSystemByCustomerValidation,
  createTagValidation,
  createTagValueValidation,
  getLastTagValueValidation,
};