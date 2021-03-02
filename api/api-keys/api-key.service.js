/**
 * This service acts as the data access layer for API Key functionalities.
 * @module api/api-keys/api-key-service
 *
 */
const { v4: uuidv4 } = require('uuid');
const pool = require("../../config/database");
const {
    getByEmail
} = require("../customers/customer.service");

/**
 * This function performs API Key generation.
 * 
 * @param {Object} data Data object with parameters from client that includes
 * - data.email - Email address of the user.
 * - data.ip - Allowed ip to access endpoints. (Not used)
 * - data.createdAt - Time that the value is created.
 * @param {function} callBack Call back function to return data
 */
const create = (data, callBack) => {
  getByEmail(data, (error, results) => {
      if(error) {
          callBack(error);
      }
      if(results.length > 0) {
        let user = results[0];
        data.value = uuidv4();
        pool.query(
            `insert into api_keys(customer_id, value, assiged_ip, created_at) values(?,?,?,?)`,
            [
              user.id,
              data.value,
              data.ip,
              data.createdAt
            ],
            (error, results, fields) => {
              if (error) {
                callBack(error);
              }
              pool.query(
                `select * from api_keys where customer_id=? order by id desc limit 0,1`,
                [
                  user.id
                ],
                (error, results) => {
                  if (error) {
                    callBack(error);
                  }
                  callBack(null, results);
                }
              )
            }
          );
      } else {
        const code = "NO_USER_FOUND";
        callBack({code});
      }
  });
}

module.exports = {
  create
};