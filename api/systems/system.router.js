/**
 * This router acts as the routing controller for requests coming into /api/system base url.
 * @module system-router
 */
const router = require("express").Router();
const { validate } = require('express-validation');
const Auth = require("../../middleware/authenticator");
const { 
    createSystemValidation,
    listSystemByCustomerValidation,
 } = require("../../middleware/validator")
const {
    createSystem,
    listSystems,
    listSystemsByCustomer,
 } = require("./system.controller");

 /**
 * This statement handles requests coming into /api/system/create endpoint.
 * 
 * @param {string} path Path of the request. Here it is /create.
 * @param {function} validatoin Validation function for the request
 * @param {function} controllerFunction Function of the controller where the request should be routed into.
 */
router.post("/create", validate(createSystemValidation, {}, {}), Auth.validateRerquest, createSystem);

/**
 * This statement handles requests coming into /api/system/list endpoint.
 * 
 * @param {string} path Path of the request. Here it is /list.
 * @param {function} controllerFunction Function of the controller where the request should be routed into.
 */
router.get("/list", listSystems);

/**
 * This statement handles requests coming into /api/list/by-customer endpoint.
 * 
 * @param {string} path Path of the request. Here it is /list/by-customer.
 * @param {function} validatoin Validation function for the request
 * @param {function} controllerFunction Function of the controller where the request should be routed into.
 */
router.get("/list/by-customer", validate(listSystemByCustomerValidation, {}, {}), listSystemsByCustomer)

module.exports = router;