/**
 * This middleware authenticates and authorizes the requests coming into
 * the API.
 * 
 * @module middleware/authenticator
 *
 */
const pool = require("../config/database");

/**
 * This function authenticates the request sent from client to the server
 * by extracting the API Key attached in the x-api-key header.
 * 
 * @param {Object} req Request coming form client to the server.
 * @param {Object} response Response generated from server to the client.
 * @param {Object} next Next function to be excecuted.
 */
const validateRerquest = (req, response, next) => {
    let baseUrl = req.baseUrl;
    let path = req.route.path;
    let apiKey = req.header('x-api-key');
    let data = {
        baseUrl,
        path,
        apiKey
    };
    getCustomer(data)
        .then((res) => {
            let resLength = res.length;
            if(resLength > 0){
                if (baseUrl == '/api/tag') {
                    console.log(path);
                    if (path == '/create/value') {
                        // checks whether the tag belongs to user
                        const tagId = req.query.tagId;
                        return checkTagAuthority(data, tagId);
                    } else if (path == '/get/value') {
                        // checks whether the tag belongs to user
                        const tagId = req.query.tagId;
                        return checkTagAuthority(data, tagId);
                    } else if (path == '/create'){
                        // checks whether system beongs to user
                        const systemId = req.query.systemId;
                        return checkSystemAuthority(data, systemId);
                    } else {
                        next();
                    }
                } else {
                    next();
                }
            } else {
                return response.status(401).json({
                    success: 0,
                    message: "User not found"
                });
            }
        })
        .then(res => {
            if (res != null) {
                let resLength = res.length;
                if(resLength > 0){
                    next();
                } else {
                    return response.status(403).json({
                        success: 0,
                        message: "Not allowed to change the resource"
                    });
                }
            }
        })
        .catch((err) => {
            return response.status(500).json({
                success: 0,
                message: "Internal server error."
            });
        });

};

/**
 * This functoin performs the SQL query to get the customer with the
 * given API Key.
 * 
 * @param {Object} data Data object that contains request data that
 * includes the following keys.
 * - data.baseUrl - Base Url that the request heading to.
 * - data.path - Path that the request heading to.
 * - data.apiKey - API Key extracted from the header.
 */
const getCustomer = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'select `customers`.`name` from (`customers` inner join `api_keys` on `api_keys`.`customer_id`=`customers`.`id`) where `api_keys`.`value`=?',
            data.apiKey,
            (error, results, fields) => {
              if (error) {
                reject(error);
              }
              resolve(results);
            }
          );
    });
};

/**
 * This functoin performs the SQL query to get the customer with the
 * given API Key and tag id.
 * 
 * @param {Object} data Data object that contains request data that
 * includes the following keys.
 * - data.baseUrl - Base Url that the request heading to.
 * - data.path - Path that the request heading to.
 * - data.apiKey - API Key extracted from the header.
 * @param {int} tagId Tag id taken from the request
 */
const checkTagAuthority = (data, tagId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'select `customers`.`name` from ((`customers` inner join `api_keys` on `api_keys`.`customer_id`=`customers`.`id`) inner join `systems` on `systems`.`customer_id` = `customers`.`id` inner join `tags` on `tags`.`system_id`=`systems`.`id`) where `api_keys`.`value`=? and `tags`.`id` =?',
            [data.apiKey, tagId],
            (error, results, fields) => {
              if (error) {
                reject(error);
              }
              resolve(results);
            }
          );
    });
}

/**
 * This functoin performs the SQL query to get the customer with the
 * given API Key and system id.
 * 
 * @param {Object} data Data object that contains request data that
 * includes the following keys.
 * - data.baseUrl - Base Url that the request heading to.
 * - data.path - Path that the request heading to.
 * - data.apiKey - API Key extracted from the header.
 * @param {int} systemId System id taken from the request
 */
const checkSystemAuthority = (data, systemId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'select `customers`.`name` from ((`customers` inner join `api_keys` on `api_keys`.`customer_id`=`customers`.`id`) inner join `systems` on `systems`.`customer_id` = `customers`.`id`) where `api_keys`.`value`=? and `systems`.`id` =?',
            [data.apiKey, systemId],
            (error, results, fields) => {
              if (error) {
                reject(error);
              }
              resolve(results);
            }
          );
    });
}

module.exports = {
    validateRerquest,
};