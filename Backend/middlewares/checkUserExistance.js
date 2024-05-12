const User = require('../models/User');

const checkUserExistence = async (req, res, next) => {
    const { name } = req.params;
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.userId = user._id;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { checkUserExistence };