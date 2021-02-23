/**
 * @global
 */
const {
    create
} = require("./api-key.service");

/**
 * This function handles API Key generation.
 * 
 * @param {Object} req Request coming from the client to the server.
 * @param {Object} res Response generated from server to the client.
 * @global
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