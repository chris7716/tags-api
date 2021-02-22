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

router.post("/create", validate(createTagValidation, {}, {}), Auth.validateRerquest, createTag);
router.post("/create/value", validate(createTagValueValidation, {}, {}), Auth.validateRerquest, createTagValue);
router.post("/get/value", validate(getLastTagValueValidation, {}, {}), Auth.validateRerquest,  getLastTagValue);

module.exports = router;