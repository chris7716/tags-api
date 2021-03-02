/**
 * This router acts as the routing controller for requests coming into /api/tag base url.
 * @module api/tags/tag-router
 */
const router = require("express").Router();
const { validate } = require('express-validation');
const Auth = require("../../middleware/authenticator");
const { 
    createTagValidation,
    createTagValueValidation,
    getLastTagValueValidation,
    listTagsByCustomerValidation,
 } = require("../../middleware/validator")
const {
    createTag,
    createTagValue,
    getLastTagValue,
    listTagsByCustomer,
 } = require("./tag.controller");

 /**
 * This statement handles requests coming into /api/tag/create endpoint.
 * 
 * @param {string} path Path of the request. Here it is /create.
 * @param {function} validatoin Validation function for the request
 * @param {function} controllerFunction Function of the controller where the request should be routed into.
 */
router.post("/create", validate(createTagValidation, {}, {}), Auth.validateRerquest, createTag);

/**
 * This statement handles requests coming into /api/tag/create/value endpoint.
 * 
 * @param {string} path Path of the request. Here it is /create.
 * @param {function} validatoin Validation function for the request
 * @param {function} controllerFunction Function of the controller where the request should be routed into.
 */
router.post("/create/value", validate(createTagValueValidation, {}, {}), Auth.validateRerquest, createTagValue);

/**
 * This statement handles requests coming into /api/tag/get/value endpoint.
 * 
 * @param {string} path Path of the request. Here it is /create.
 * @param {function} validatoin Validation function for the request
 * @param {function} controllerFunction Function of the controller where the request should be routed into.
 */
router.post("/get/value", validate(getLastTagValueValidation, {}, {}), Auth.validateRerquest,  getLastTagValue);

/**
 * This statement handles requests coming into /api/list/by-customer endpoint.
 * 
 * @param {string} path Path of the request. Here it is /list/by-customer.
 * @param {function} validatoin Validation function for the request
 * @param {function} controllerFunction Function of the controller where the request should be routed into.
 */
router.get("/list/by-customer", validate(listTagsByCustomerValidation, {}, {}), Auth.validateRerquest, listTagsByCustomer);

module.exports = router;