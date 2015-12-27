const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const itemModel = new Schema({
    name: {type: String},
    quantity: {type: Number},
    size: {type: String}
});

const orderModel = new Schema({
    location: {type: String},
    items: [itemModel],
    cost: {type: Number, default: 0},
    status: {type: String, default: 'unpaid'}
});

module.exports.Order = mongoose.model('Order', orderModel);
