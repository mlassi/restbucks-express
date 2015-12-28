const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const itemModel = new Schema({
    name: {type: String},
    quantity: {type: Number},
    size: {type: String}
});

const paymentModel = new Schema({
    amount: {type: Number},
    cardHolderName: {type: String},
    cardNumber: {type: String},
    expiryMonth: {type: String},
    expiryYear: {type: String},
    cardType: {type: String}
});

const receiptModel = new Schema({
    amount: {type: Number},
    paid: {type: Date}
});

const orderModel = new Schema({
    location: {type: String},
    items: [itemModel],
    cost: {type: Number, default: 0},
    payment: paymentModel,
    status: {type: String, default: 'unpaid'}
});

module.exports.Order = mongoose.model('Order', orderModel);
