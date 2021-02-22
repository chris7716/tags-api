const {
    create
} = require("./api-key.service");

module.exports = {
    createApiKey: (req, res) => {
        const email = req.query.email;
        const ip = req.query.assignedIp;
        const createdAt = new Date(); 
        const data = {
            email,
            ip,
            createdAt
        };
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
        })
    }
};