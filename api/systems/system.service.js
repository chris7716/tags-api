/**
 * This service acts as the data access layer for System functionalities.
 * @module api/systems/system-service
 *
 */
const pool = require("../../config/database");
const {
  getByApiKey
} = require('../customers/customer.service');

/**
 * This function performs System save functionalities.
 * First the customer is fetched using the API Key. With the use of fecthed customer data, 
 * system object is saved.
 * 
 * @param {Object} data Data object with parameters from client that includes
 * - data.apiKey - API Key of the customer extracted from header.
 * - data.name - Name of the system.
 * - data.description - Description of the system.
 * @param {function} callBack Call back function to return data.
 */
const create = (data, callBack) => {
  getByApiKey(data, (err, results) => {
    if (err) {
      callBack(err);
    }
    let user = results[0];
    pool.query(
      `insert into systems(customer_id, name, description) values(?,?,?)`,
      [
        user.id,
        data.name,
        data.description
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        callBack(null, results);
      }
    );
  })
}

/**
 * This function performs System list functionalities.
 * 
 * @param {function} callBack Call back function to return data.
 */
const list = (callBack) => {
  pool.query(
      `select * from systems`,
      (error, results, fields) => {
          if (error) {
              callBack(error);
          }
          callBack(null, results);
      }
  );
}

/**
 * This function performs get systems by customer operation.
 * First the customer is fetched using the API Key. With the use of fecthed customer data, 
 *  customer's systems are filtered.
 * 
 * @param {Object} data Data object with parameters from client that includes
 * - data.apiKey - API Key of the customer extracted from header.
 * @param {function} callBack Call back function to return data.
 */
const listByCustomer = (data, callBack) => {
  getByApiKey(data, (err, results) => {
    if (err) {
      callBack(err);
    }
    let user = results[0];
    pool.query(
      'select * from `systems` where `customer_id`=?',
      user.id,
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        callBack(null, results);
      }
    );
  })
}

module.exports = {
  create,
  list,
  listByCustomer,
};