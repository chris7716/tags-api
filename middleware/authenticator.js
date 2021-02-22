const pool = require("../config/database");
const validateRerquest = (req, response, next) => {
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
            let resLength = res.length;
            if(resLength > 0){
                if (baseUrl == '/api/tag') {
                    console.log(path);
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
                        const systemId = req.query.systemId;
                        return checkSystemAuthority(data, systemId);
                    } else {
                        next();
                    }
                } else {
                    next();
                }
            } else {
                return response.status(401).json({
                    success: 0,
                    message: "User not found"
                });
            }
        })
        .then(res => {
            if (res != null) {
                let resLength = res.length;
                if(resLength > 0){
                    next();
                } else {
                    return response.status(403).json({
                        success: 0,
                        message: "Not allowed to change the resource"
                    });
                }
            }
        })
        .catch((err) => {
            console.log(err);
            return response.status(500).json({
                success: 0,
                message: "Internal server error."
            });
        });

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
                reject(error);
              }
              resolve(results);
            }
          );
    });
}
const checkSystemAuthority = (data, systemId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'select `customers`.`name` from ((`customers` inner join `api_keys` on `api_keys`.`customer_id`=`customers`.`id`) inner join `systems` on `systems`.`customer_id` = `customers`.`id`) where `api_keys`.`value`=? and `systems`.`id` =?',
            [data.apiKey, systemId],
            (error, results, fields) => {
              if (error) {
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