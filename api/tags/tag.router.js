/**
 * This router acts as the routing controller for requests coming into /api/tag base url.
 * @module tag-router
 */
const router = require("express").Router();
const { validate } = require('express-validation');
const Auth = require("../../middleware/authenticator");
const { 
    createTagValidation,
    createTagValueValidation,
    getLastTagValueValidation,
 } = require("../../middleware/validator")
const {
    createTag,
    createTagValue,
    getLastTagValue,
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

module.exports = router;