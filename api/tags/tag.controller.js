/**
 * This controller acts as the controller for requests coming into /api/tag endpoints.
 * @module api/tags/tag-controller
 *
 */
const {
    create,
    createValue,
    getLastTagValueById,
} = require("./tag.service");

/**
 * This function works as the request controller for Tag generation.
 * Requests for /api/tag/create are recieved for this method.
 * 
 * @param {Object} req Request coming from the client to the server.
 * @param {Object} res Response generated from server to the client.
 * @returns {Object} res Response to the client.
 * - res.success - Whether the operation is success or nor.
 * - res.data - Data of the saved tag, if the operation is success.
 * - res.message - Error message, if the operation is failed.
 */
const createTag = (req, res) => {
    const systemId = req.query.systemId;
    const name = req.query.name;
    const description = req.query.description;
    const currentTime = new Date();
    const timestamp = currentTime.getTime();
    const data = {
        systemId,
        name,
        description,
        currentTime,
    };
    console.log(timestamp);
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
    });
}

/**
 * This function works as the request controller for Tag value generation.
 * Requests for /api/tag/create/value are recieved for this method.
 * 
 * @param {Object} req Request coming from the client to the server.
 * @param {Object} res Response generated from server to the client.
 * @returns {Object} res Response to the client.
 * - res.success - Whether the operation is success or nor.
 * - res.data - Data of the saved tag value, if the operation is success.
 * - res.message - Error message, if the operation is failed.
 */
const createTagValue = (req, res) => {
    const tagId = req.query.tagId;
    const value = req.query.value;
    const currentTime = new Date();
    const data = {
        tagId,
        value,
        currentTime,
    };
    createValue(data, (err, results) => {
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
 * This function works as the request controller for fetching last value of a given tag.
 * Requests for /api/tag/get/value are recieved for this method.
 * 
 * @param {Object} req Request coming from the client to the server.
 * @param {Object} res Response generated from server to the client.
 * @returns {Object} res Response to the client.
 * - res.success - Whether the operation is success or nor.
 * - res.data - Data of the last tag value, if the operation is success.
 * - res.message - Error message, if the operation is failed.
 */
const getLastTagValue = (req, res) => {
    console.log(req.route.path);
    const tagId = req.query.tagId;
    const value = req.query.value;
    const currentTime = new Date();
    const data = {
        tagId,
        value,
        currentTime,
    };
    getLastTagValueById(data, (err, results) => {
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
    createTag,
    createTagValue,
    getLastTagValue,
};