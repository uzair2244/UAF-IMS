const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transection');
const User = require('../models/User');
const Product = require('../models/Product');

const populateData = async (req, res, next) => {
    try {
        console.log(req.body)
        const assigner = await User.findById(req.body.assigner);
        if (!assigner) {
            return res.status(404).json({ message: "Assigner not found" });
        }

        const user = await User.findOne({ username: req.body.user });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const item = await Product.findOne({ name: req.body.item });
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        req.assigner = assigner;
        req.user = user._id;
        req.item = item;
        next();
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

router.post('/assign', populateData, async (req, res) => {
    try {
        const { assigner, user, item, quantity, description } = req.body;
        console.log(req.body)
        const transaction = new Transaction({
            assigner: req.assigner,
            user: req.user,
            item: req.item,
            quantity,
            description
        });

        await transaction.save();

        const prod = await Product.findById(req.item)
        prod.units -= quantity;
        await prod.save()

        return res.status(201).json({ message: "Inventory assigned successfully", transaction });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error", err });
    }
});

router.post("/get-transactions", async (req, res) => {
    let { user, date } = req.body;
    const dateRegex = new RegExp(`${date}`)
    console.log(dateRegex)
    console.log(req.body)
    console.log(date)

    const transactions = await Transaction.find({
        createdAt: dateRegex
    }).populate([{
        path: "user",
        model: "User",
        select: "username email role createdAt"
    },
    {
        path: "item",
        model: "Product",
    },
    {
        path: "assigner",
        model: "User",
        select: "username email"
    }
    ]);
    const transactionData = [];
    transactions.forEach((transaction) => {
        if (transaction.user.username == user) {
            transactionData.push(transaction)
        }
    })

    res.status(200).json(transactionData)
})
module.exports = router;
