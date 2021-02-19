require("dotenv").config();
const express = require("express");
const app = express();
const { ValidationError } = require('express-validation')
const customerRouter = require("./api/customers/customer.router");
const systemRouter = require("./api/systems/system.router");
const tagRouter = require("./api/tags/tag.router");

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use("/api/customer", customerRouter);
app.use("/api/system", systemRouter);
app.use("/api/tag", tagRouter);
app.use(function(err, req, res, next) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err);
    }
   
    return res.status(500).json(err);
});
app.get("/test", (req, res) => {
    res.json({
        success: 1,
        message: "API is working"
    });
});

app.listen(process.env.APP_PORT, () => {
    console.log("Server running in port 8000");
});