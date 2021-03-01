/**
 * This middleware validates the requests coming into
 * the API.
 * 
 * @module validator
 *
 */
const { Joi } = require('express-validation');

/**
 * Evaluates the validations for /api/customer/create
 */
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

/**
 * Evaluates the validations for /api/system/create
 */
const createSystemValidation = {
  query: Joi.object({
    name: Joi.string()
      .required(),
    description: Joi.string()
      .allow(),
  }),
  
  headers: Joi.object({
    'x-api-key': Joi.string()
      .required(),
    host: Joi.string()
      .allow(),
    connection: Joi.string()
      .allow(),
    'content-length': Joi.string()
      .allow(),
    'postman-token': Joi.string()
      .allow(),
    'cache-control': Joi.string()
      .allow(),
    'user-agent': Joi.string()
      .allow(),
    'content-type': Joi.string()
      .allow(),
    accept: Joi.string()
      .allow(),
    origin: Joi.string()
      .allow(),
    'sec-fetch-site': Joi.string()
      .allow(),
    'sec-fetch-mode': Joi.string()
      .allow(),
    'sec-fetch-dest': Joi.string()
      .allow(),
    'accept-encoding': Joi.string()
      .allow(),
    'accept-language': Joi.string()
      .allow(),
  })
};

/**
 * Evaluates the validations for /api/system/list/by-customer
 */
const listSystemByCustomerValidation = {
  
  headers: Joi.object({
    'x-api-key': Joi.string()
      .required(),
    host: Joi.string()
      .allow(),
    connection: Joi.string()
      .allow(),
    'content-length': Joi.string()
      .allow(),
    'postman-token': Joi.string()
      .allow(),
    'cache-control': Joi.string()
      .allow(),
    'user-agent': Joi.string()
      .allow(),
    'content-type': Joi.string()
      .allow(),
    accept: Joi.string()
      .allow(),
    origin: Joi.string()
      .allow(),
    'sec-fetch-site': Joi.string()
      .allow(),
    'sec-fetch-mode': Joi.string()
      .allow(),
    'sec-fetch-dest': Joi.string()
      .allow(),
    'accept-encoding': Joi.string()
      .allow(),
    'accept-language': Joi.string()
      .allow(),
  })
};

/**
 * Evaluates the validations for /api/tag/create
 */
const createTagValidation = {
  query: Joi.object({
    systemId: Joi.string()
      .required(),
    name: Joi.string()
      .required(),
    description: Joi.string()
      .allow(),
  }),
  
  headers: Joi.object({
    'x-api-key': Joi.string()
      .required(),
    host: Joi.string()
      .allow(),
    connection: Joi.string()
      .allow(),
    'content-length': Joi.string()
      .allow(),
    'postman-token': Joi.string()
      .allow(),
    'cache-control': Joi.string()
      .allow(),
    'user-agent': Joi.string()
      .allow(),
    'content-type': Joi.string()
      .allow(),
    accept: Joi.string()
      .allow(),
    origin: Joi.string()
      .allow(),
    'sec-fetch-site': Joi.string()
      .allow(),
    'sec-fetch-mode': Joi.string()
      .allow(),
    'sec-fetch-dest': Joi.string()
      .allow(),
    'accept-encoding': Joi.string()
      .allow(),
    'accept-language': Joi.string()
      .allow(),
  })
};

/**
 * Evaluates the validations for /api/tag/create/value
 */
const createTagValueValidation = {
  query: Joi.object({
    tagId: Joi.string()
      .required(),
    value: Joi.string()
      .allow(),
  }),
  headers: Joi.object({
    'x-api-key': Joi.string()
      .required(),
    host: Joi.string()
      .allow(),
    connection: Joi.string()
      .allow(),
    'content-length': Joi.string()
      .allow(),
    'postman-token': Joi.string()
      .allow(),
    'cache-control': Joi.string()
      .allow(),
    'user-agent': Joi.string()
      .allow(),
    'content-type': Joi.string()
      .allow(),
    accept: Joi.string()
      .allow(),
    origin: Joi.string()
      .allow(),
    'sec-fetch-site': Joi.string()
      .allow(),
    'sec-fetch-mode': Joi.string()
      .allow(),
    'sec-fetch-dest': Joi.string()
      .allow(),
    'accept-encoding': Joi.string()
      .allow(),
    'accept-language': Joi.string()
      .allow(),
  })
};

/**
 * Evaluates the validations for /api/tag/get/value
 */
const getLastTagValueValidation = {
  query: Joi.object({
    tagId: Joi.string()
      .required(),
    value: Joi.string()
      .allow(),
  }),
  
  headers: Joi.object({
    'x-api-key': Joi.string()
      .required(),
    host: Joi.string()
      .allow(),
    connection: Joi.string()
      .allow(),
    'content-length': Joi.string()
      .allow(),
    'postman-token': Joi.string()
      .allow(),
    'cache-control': Joi.string()
      .allow(),
    'user-agent': Joi.string()
      .allow(),
    'content-type': Joi.string()
      .allow(),
    accept: Joi.string()
      .allow(),
    origin: Joi.string()
      .allow(),
    'sec-fetch-site': Joi.string()
      .allow(),
    'sec-fetch-mode': Joi.string()
      .allow(),
    'sec-fetch-dest': Joi.string()
      .allow(),
    'accept-encoding': Joi.string()
      .allow(),
    'accept-language': Joi.string()
      .allow(),
  })
};

/**
 * Evaluates the validations for /api/key/create
 */
const createApiKeyValidatoin = {
  query: Joi.object({
    email: Joi.string()
      .required()
      .email(),
    assignedIp: Joi.string()
      .regex(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)
      .required(),
  }),
};

module.exports = {
  createCustomerValidation,
  createSystemValidation,
  listSystemByCustomerValidation,
  createTagValidation,
  createTagValueValidation,
  getLastTagValueValidation,
  createApiKeyValidatoin,
};