const router = require("express").Router();
const { validate } = require('express-validation');
const { createCustomerValidation } = require("../../middleware/validator")
const {
    createCustomer,
    listCustomers
} = require("./customer.controller");

router.post("/create", validate(createCustomerValidation, {}, {}), createCustomer);
router.get("/list", listCustomers);

module.exports = router;