/**
 * This controller acts as the controller for requests coming into /api/key endpoints.
 * @module api/api-keys/api-key-controller
 */
const {
    create
} = require("./api-key.service");

/**
 * This function works as the request controller for API Key generation.
 * Requests for /api/key/create are recieved for this method
 * 
 * @param {Object} req Request coming from the client to the server.
 * @param {Object} res Response generated from server to the client.
 */
const createApiKey = (req, res) => {
    const email = req.query.email;
    const ip = req.query.assignedIp;
    const createdAt = new Date(); 
    const data = {
        email,
        ip,
        createdAt
    };
    /**
     * create functoin of the api-key.service.ts is called.
     * 
     * @param {Object} data Data which are passed into service to generate and save an API Key.
     * @param {function} () Call Back function that is passed to the service.
     */
    create(data, (err, results) => {
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
    })
}
module.exports = {
    createApiKey,
};