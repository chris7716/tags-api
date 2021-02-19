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
        const body = {
            customerId,
            name,
            description
        };
        create(body, (err, results) => {
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
    listSystems: (req, res) => {
        console.log("Listing systems....");
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
        const data = {
            customerId,
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