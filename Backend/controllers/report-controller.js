const Transaction = require('../models/Transaction');

exports.generateUserReport = async (req, res) => {
    const { userId } = req;
    const { year, month, date } = req.query;

    const query = { user: userId };

    if (year && month && date) {
        query.createdAt = {
            $gte: new Date(year, month - 1, date),
            $lt: new Date(year, month - 1, +date + 1)
        };
    } else if (year && month) {
        query.createdAt = {
            $gte: new Date(year, month - 1),
            $lt: new Date(year, month)
        };
    } else if (year) {
        query.createdAt = {
            $gte: new Date(year),
            $lt: new Date(+year + 1)
        };
    }

    try {
        const transactions = await Transaction.find(query);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
