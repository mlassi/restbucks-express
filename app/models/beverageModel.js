const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const beverageModel = new Schema({
    name: {type: String}
});

module.exports.Beverage = mongoose.model('Beverage', beverageModel);
