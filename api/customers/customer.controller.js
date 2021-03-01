/**
 * This controller acts as the controller for requests coming into /api/customer endpoints.
 * @module customer-controller
 *
 */
const {
    create,
    list
} = require("./customer.service");

/**
 * This function works as the request controller for Customer generation.
 * Requests for /api/customer/create are recieved for this method
 * 
 * @param {Object} req Request coming from the client to the server.
 * @param {Object} res Response generated from server to the client.
 * @returns {Object} res Response to the client.
 * - res.success - Whether the operation is success or nor.
 * - res.data - Data of the saved customer, if the operation is success.
 * - res.message - Error message, if the operation is failed.
 */
const createCustomer = (req, res) => {
    const name = req.query.name;
    const email = req.query.email;
    const telephone = req.query.telephone;
    const body = {
        name,
        email,
        telephone
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
 * This function works as the request controller for listing Customers.
 * Requests for /api/customer/list are recieved for this method
 * 
 * @param {Object} req Request coming from the client to the server.
 * @param {Object} res Response generated from server to the client.
 * @returns {Object} res Response to the client.
 * - res.success - Whether the operation is success or nor.
 * - res.data - Data of the saved customer, if the operation is success.
 * - res.message - Error message, if the operation is failed.
 */
const listCustomers = (req, res) => {
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

module.exports = {
    createCustomer,
    listCustomers,
};