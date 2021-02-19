const {
    create,
    createTagValue,
    getLastTagValueById,
} = require("./tag.service");

module.exports = {
    createTag: (req, res) => {
        const systemId = req.query.systemId;
        const name = req.query.name;
        const description = req.query.description;
        const currentTime = new Date();
        const timestamp = currentTime.getTime();
        const data = {
            systemId,
            name,
            description,
            currentTime,
        };
        console.log(timestamp);
        create(data, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                success: 0,
                message: "Database connection errror"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    createTagValue: (req, res) => {
        const tagId = req.query.tagId;
        const value = req.query.value;
        const currentTime = new Date();
        const data = {
            tagId,
            value,
            currentTime,
        };
        createTagValue(data, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                success: 0,
                message: "Database connection errror"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getLastTagValue: (req, res) => {
        console.log(req.route.path);
        const tagId = req.query.tagId;
        const value = req.query.value;
        const currentTime = new Date();
        const data = {
            tagId,
            value,
            currentTime,
        };
        getLastTagValueById(data, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                success: 0,
                message: "Database connection errror"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
};