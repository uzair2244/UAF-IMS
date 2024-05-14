const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    assigner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: () => new Date().toISOString().slice(0, 10)
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
