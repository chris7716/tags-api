const router = require("express").Router();
const { validate } = require('express-validation');
const { createCustomerValidation } = require("../../middleware/validator")
const {
    createCustomer
} = require("./customer.controller");

router.post("/create", validate(createCustomerValidation, {}, {}), createCustomer);

module.exports = router;