/**
 * This service acts as the data access layer for Tag functionalities.
 * @module api/tags/tag-service
 *
 */
const pool = require('../../config/database');
const {
    getByApiKey
} = require('../customers/customer.service'); 

/**
 * This function performs Tag save functionalities.
 * 
 * @param {Object} data Data object with parameters from client that includes
 * - data.systemId - id of the system that tag belongs to.
 * - data.name - Name for the tag.
 * - data.description - Description of the tag.
 * - data.currentTime - Time that the tag value is created.
 * @param {function} callBack Call back function to return data
 */
const create = (data, callBack) => {
    pool.query(
        'insert into tags(system_id, name, description, created_at) values(?,?,?,?)',
        [
            data.systemId,
            data.name,
            data.description,
            data.currentTime,
        ],
        (error, results, fields) => {
            if(error){
                callBack(error);
            }
            callBack(null, results);
        },
    );
}

/**
 * This function performs Tag list functionalities.
 * 
 * @param {function} callBack Call back function to return data
 */
const list = (callBack) => {
    pool.query(
        `select * from tags`,
        (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            callBack(null, results);
        }
    );
}

/**
 * This function performs Tag value create functionalities.
 * 
 * @param {Object} data Data object with parameters from client that includes
 * - data.tagId - id of the tag that tag value belongs to.
 * - data.value - Value of the tag.
 * - data.currentTime - Time that the value is fetched.
 * @param {function} callBack Call back function to return data
 */
const createValue = (data, callBack) => {
    pool.query(
        'insert into tag_values(tag_id, value, created_at) values(?,?,?)',
        [
            data.tagId,
            data.value,
            data.currentTime,
        ],
        (error, results, fields) => {
            if(error){
                callBack(error);
            }
            callBack(null, results);
        },
    );
}

/**
 * This function performs fetching last tag value functionalities.
 * 
 * @param {Object} data Data object with parameters from client that includes
 * - data.tagId - id of the tag that tag value belongs to.
 * @param {function} callBack Call back function to return data
 */
const getLastTagValueById = (data, callBack) => {
    pool.query(
        'select * from tag_values where tag_id=? order by created_at desc limit 1',
        [
            data.tagId,
        ],
        (error, results, fields) => {
            if(error){
                callBack(error);
            }
            callBack(null, results);
        },
    );
}

/**
 * This function performs get tags by customer operation.
 * First the customer is fetched using the API Key. With the use of fecthed customer data, 
 * customer's tags are filtered.
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
      console.log(user);
      pool.query(
        'select `tags`.* from (`tags` inner join `systems` on `tags`.`system_id`=`systems`.`id`) inner join `customers` on `systems`.`customer_id` = `customers`.`id` where `customers`.`id`=?',
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
    createValue,
    getLastTagValueById,
    listByCustomer,
};