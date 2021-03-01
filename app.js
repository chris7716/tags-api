/**
 * 
 * Main configurations of the application are added in
 * this App.js file.
 * @file app.js is the root of the application.
 * 
 */
require("dotenv").config();
const express = require("express");
const app = express();
const { ValidationError } = require('express-validation')
const customerRouter = require("./api/customers/customer.router");
const systemRouter = require("./api/systems/system.router");
const tagRouter = require("./api/tags/tag.router");
const apiKeyRouter = require("./api/api-keys/api-key.router");

/**
 * JSON and query params request bodies are allowed
 * from these configuratoins.
 * 
 */
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

/**
 * Main routings of the API are handled,
 * 
 * /api/customer - Customer API routings
 * /api/system - System API routings
 * /api/tag - Tag API routings
 * /api/key - Key API routings
 * 
 */
app.use("/api/customer", customerRouter);
app.use("/api/system", systemRouter);
app.use("/api/tag", tagRouter);
app.use("/api/key", apiKeyRouter);

/**
 * 
 * Global validation error handler
 * 
 */
app.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }
   
    return res.status(500).json(err);
});

app.listen(process.env.APP_PORT, () => {
    console.log("Server running in port 8000");
});