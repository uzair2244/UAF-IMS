const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Product = require('../models/Product');

const populateData = async (req, res, next) => {
    try {
        const assigner = await User.findById(req.body.assigner);
        if (!assigner) {
            return res.status(404).json({ message: "Assigner not found" });
        }

        const user = await User.findById(req.body.user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const item = await Product.findById(req.body.item);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        req.assigner = assigner;
        req.user = user;
        req.item = item;
        next();
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

router.post('/assign', populateData, async (req, res) => {
    try {
        const { assigner, user, item, quantity, description } = req.body;

        const transaction = new Transaction({
            assigner: req.assigner,
            user: req.user,
            item: req.item,
            quantity,
            description
        });

        await transaction.save();

        return res.status(201).json({ message: "Inventory assigned successfully", transaction });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
