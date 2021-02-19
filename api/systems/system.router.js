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

router.post("/create", validate(createSystemValidation, {}, {}), Auth.validateRerquest, createSystem);
router.get("/list", listSystems);
router.get("/list/by-customer", validate(listSystemByCustomerValidation, {}, {}), listSystemsByCustomer)

module.exports = router;