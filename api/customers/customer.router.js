/**
 * This router acts as the routing controller for requests coming into /api/customer base url.
 * @module customer-router
 */
const router = require("express").Router();
const { validate } = require('express-validation');
const { createCustomerValidation } = require("../../middleware/validator")
const {
    createCustomer,
    listCustomers
} = require("./customer.controller");

/**
 * This statement handles requests coming into /api/customer/create endpoint.
 * 
 * @param {string} path Path of the request. Here it is /create.
 * @param {function} validatoin Validation function for the request
 * @param {function} controllerFunction Function of the controller where the request should be routed into.
 */
router.post("/create", validate(createCustomerValidation, {}, {}), createCustomer);

/**
 * This statement handles requests coming into /api/customer/list endpoint.
 * 
 * @param {string} path Path of the request. Here it is /list.
 * @param {function} controllerFunction Function of the controller where the request should be routed into.
 */
router.get("/list", listCustomers);

module.exports = router;