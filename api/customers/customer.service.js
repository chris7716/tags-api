/**
 * This service acts as the data access layer for Customer functionalities.
 * @module api/customers/customer-service
 *
 */
const pool = require("../../config/database");

/**
 * This function performs Customer save functionalities.
 * 
 * @param {Object} data Data object with parameters from client that includes
 * - data.name - Name of the client.
 * - data.email - Email address of the client.
 * - data.telephone - Telephone number of the client.
 * @param {function} callBack Call back function to return data
 */
const create = (data, callBack) => {
  pool.query(
    `insert into customers(name, email, telephone) values(?,?,?)`,
    [
      data.name,
      data.email,
      data.telephone
    ],
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      callBack(null, results);
    }
  );
}

/**
 * This function performs Customer list functionalities.
 * 
 * @param {function} callBack Call back function to return data
 */
const list = (callBack) => {
  pool.query(
    `select * from customers`,
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      callBack(null, results);
    }
  );
}

/**
 * This function performs get Customer by email functionalities.
 * 
 * @param {function} callBack Call back function to return data
 */
const getByEmail = (data, callBack) => {
  pool.query(
    `select * from customers where email=?`,
    data.email,
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      callBack(null, results);
    }
  );
}


/**
 * This function performs get Customer by api-key functionalities.
 * 
 * @param {function} callBack Call back function to return data
 */
const getByApiKey = (data, callBack) => {
  pool.query(
    'select `customers`.* from (`customers` inner join `api_keys` on `api_keys`.`customer_id`=`customers`.`id`) where `api_keys`.`value`=?',
    data.apiKey,
    (error, results, fields) => {
      if (error) {
        callBack(error);
      }
      callBack(null, results);
    }
  );
}

module.exports = {
  create,
  list,
  getByEmail,
  getByApiKey,
};