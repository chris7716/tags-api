/**
 * This router acts as the routing controller for requests coming into /api/key base url.
 * @module api/api-keys/api-key-router
 */
const router = require("express").Router();
const { validate } = require('express-validation');
const { createApiKeyValidatoin } = require('../../middleware/validator');
const {
    createApiKey
} = require("./api-key.controller");

/**
 * This statement handles requests coming into /api/key/create endpoint.
 * 
 * @param {string} path Path of the request. Here it is /create.
 * @param {function} validatoin Validation function for the request
 * @param {function} controllerFunction Function of the controller where the request should be routed into.
 */
router.post("/create", validate(createApiKeyValidatoin, {}, {}), createApiKey);

module.exports = router;