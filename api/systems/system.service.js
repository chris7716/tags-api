const pool = require("../../config/database");
const {
  getByApiKey
} = require('../customers/customer.service');

module.exports = {
    create : (data, callBack) => {
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
    },
};