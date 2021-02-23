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
      let user = results[0];
      console.log(user);
      data.value = uuidv4();
      console.log(data);
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
            callBack(null, results);
          }
        );
  });
}

module.exports = {
  create
};