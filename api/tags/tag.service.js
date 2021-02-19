const pool = require('../../config/database');

module.exports = {
    create: (data, callBack) => {
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
    },
    list: (callBack) => {
        pool.query(
            `select * from tags`,
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                callBack(null, results);
            }
        );
    },
    createTagValue: (data, callBack) => {
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
    },
    getLastTagValueById: (data, callBack) => {
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
    },
};