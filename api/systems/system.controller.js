const {
    create,
    list,
    listByCustomer,
} = require("./system.service");

module.exports = {
    createSystem: (req, res) => {
        const customerId = req.query.customerId;
        const name = req.query.name;
        const description = req.query.description;
        const apiKey =req.header('x-api-key');
        const body = {
            apiKey,
            name,
            description
        };
        create(body, (err, results) => {
            if (err) {
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
    listSystems: (req, res) => {
        list((err, results) => {
            if (err) {
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
    listSystemsByCustomer: (req, res) => {
        const customerId = req.query.customerId;
        const apiKey =req.header('x-api-key');
        const data = {
            apiKey,
        };
        listByCustomer(data, (err, results) => {
            if (err) {
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