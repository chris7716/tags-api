/**
 * This controller acts as the controller for requests coming into /api/system endpoints.
 * @module system-controller
 *
 */
const {
    create,
    list,
    listByCustomer,
} = require("./system.service");

/**
 * This function works as the request controller for System generation.
 * Requests for /api/system/create are recieved for this method.
 * 
 * @param {Object} req Request coming from the client to the server.
 * @param {Object} res Response generated from server to the client.
 * @returns {Object} res Response to the client.
 * - res.success - Whether the operation is success or nor.
 * - res.data - Data of the saved system, if the operation is success.
 * - res.message - Error message, if the operation is failed.
 */
const createSystem = (req, res) => {
    const name = req.query.name;
    const description = req.query.description;
    const apiKey =req.header('x-api-key');
    const body = {
        apiKey,
        name,
        description
    };
    create(body, (err, results) => {
        if (err) {
            return res.status(500).json({
            success: 0,
            message: "Database connection errror"
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    });
}

/**
 * This function works as the request controller for listing Systems.
 * Requests for /api/system/list are recieved for this method.
 * 
 * @param {Object} req Request coming from the client to the server.
 * @param {Object} res Response generated from server to the client.
 * @returns {Object} res Response to the client.
 * - res.success - Whether the operation is success or nor.
 * - res.data - Data of the system list, if the operation is success.
 * - res.message - Error message, if the operation is failed.
 */
const listSystems = (req, res) => {
    list((err, results) => {
        if (err) {
            return res.status(500).json({
            success: 0,
            message: "Database connection errror"
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    });
}

/**
 * This function works as the request controller for listing Systems by Customer.
 * API Key is extracted from the header and it is used as an identifier.
 * Requests for /api/system/list/by-customer are recieved for this method.
 * 
 * @param {Object} req Request coming from the client to the server.
 * @param {Object} res Response generated from server to the client.
 * @returns {Object} res Response to the client.
 * - res.success - Whether the operation is success or nor.
 * - res.data - Data of the customer's systems, if the operation is success.
 * - res.message - Error message, if the operation is failed.
 */
const listSystemsByCustomer = (req, res) => {
    const apiKey =req.header('x-api-key');
    const data = {
        apiKey,
    };
    listByCustomer(data, (err, results) => {
        if (err) {
            return res.status(500).json({
            success: 0,
            message: "Database connection errror"
            });
        }
        return res.status(200).json({
            success: 1,
            data: results
        });
    });
}

module.exports = {
    createSystem,
    listSystems,
    listSystemsByCustomer,
};