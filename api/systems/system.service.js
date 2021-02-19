const pool = require("../../config/database");

module.exports = {
    create : (data, callBack) => {
        pool.query(
            `insert into systems(customer_id, name, description) values(?,?,?)`,
            [
              data.customerId,
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
    },
    list: (callBack) => {
        pool.query(
            `select * from systems`,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                callBack(null, results);
            }
        );
    },
    listByCustomer: (data, callBack) => {
      pool.query(
        'select * from `systems` where `customer_id`=?',
        data.customerId,
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          callBack(null, results);
        }
      );
    },
};