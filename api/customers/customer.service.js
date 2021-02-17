const pool = require("../../config/database");

module.exports = {
    create: (data, callback) => {
        pool.query(
            `insert into registration(firstName, lastName, gender, email, password, number) 
                      values(?,?,?,?,?,?)`,
            [
              data.first_name,
              data.last_name,
              data.gender,
              data.email,
              data.password,
              data.number
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