const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const orderModel = new Schema({
    location: {type: String},
    cost: {type: Number},
    status: {type: String, default: 'unpaid'}
});

module.exports.Order = mongoose.model('Order', orderModel);
