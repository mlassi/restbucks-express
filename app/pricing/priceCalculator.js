const priceList = require('./priceList')();
const _ = require('lodash');

const priceCalculator = function () {

    function calculate(order) {
        return order._doc.items.reduce(function (total, item) {

            total += findPrice(item) * item.quantity;

            return total;
        }, 0);
    }

    function findPrice(item) {
        return _(priceList).findWhere(function (priceItem) {
            return priceItem.name === item._doc.name && priceItem.size === item._doc.size;
        }).cost;
    }

    return {
        calculate: calculate
    }
}

module.exports = priceCalculator;
