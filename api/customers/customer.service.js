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
              return callBack(null, results);
            }
        );
    }
};