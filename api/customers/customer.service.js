const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
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
    },
    list: (callBack) => {
      pool.query(
        `select * from customers`,
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          callBack(null, results);
        }
      );
    },
    getByEmail: (data, callBack) => {
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
    },
    getByApiKey: (data, callBack) => {
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
};