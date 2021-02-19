const pool = require("../config/database");
const validateRerquest = (req, res, next) => {
    let baseUrl = req.baseUrl;
    let path = req.route.path;
    let apiKey = req.header('x-api-key');
    let data = {
        baseUrl,
        path,
        apiKey
    };
    getCustomer(data)
        .then((res) => {
            console.log(res);
            if (baseUrl == '/api/tag') {
                if (path == '/create/value') {
                    // checks whether the tag belongs to user
                    const tagId = req.query.tagId;
                    return checkTagAuthority(data, tagId);
                } else if (path == '/get/value') {
                    // checks whether the tag belongs to user
                    const tagId = req.query.tagId;
                    return checkTagAuthority(data, tagId);
                } else if (path == '/create'){
                    // checks whether system beongs to user
                } else {
                    next();
                }
            } else {
                next();
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch((err) => console.log(err));

};
const getCustomer = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'select `customers`.`name` from (`customers` inner join `api_keys` on `api_keys`.`customer_id`=`customers`.`id`) where `api_keys`.`value`=?',
            data.apiKey,
            (error, results, fields) => {
              if (error) {
                reject(error);
              }
              resolve(results);
            }
          );
    });
};
const checkTagAuthority = (data, tagId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'select `customers`.`name` from ((`customers` inner join `api_keys` on `api_keys`.`customer_id`=`customers`.`id`) inner join `systems` on `systems`.`customer_id` = `customers`.`id` inner join `tags` on `tags`.`system_id`=`systems`.`id`) where `api_keys`.`value`=? and `tags`.`id` =?',
            [data.apiKey, tagId],
            (error, results, fields) => {
              if (error) {
                console.log("Error");
                reject(error);
              }
              resolve(results);
            }
          );
    });
}

module.exports = {
    validateRerquest,
};