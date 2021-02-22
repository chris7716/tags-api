const router = require("express").Router();
const { validate } = require('express-validation');
const { createApiKeyValidatoin } = require('../../middleware/validator');
const {
    createApiKey
} = require("./api-key.controller");

router.post("/create", validate(createApiKeyValidatoin, {}, {}), createApiKey);

module.exports = router;