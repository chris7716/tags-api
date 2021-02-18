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

module.exports = {
  createCustomerValidation
};