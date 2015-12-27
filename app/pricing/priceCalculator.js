const priceList = require('./priceList')();
const _ = require('lodash');

const priceCalculator = function () {
    'use strict';

    function calculate(order) {
        return _.reduce(order._doc.items, function (total, item) {

            total += findPrice(item) * item.quantity;

            return total;
        }, 0);
    }

    function findPrice(item) {
        const priceListItem = _.filter(priceList, function(priceItem) {
             return priceItem.name === item._doc.name && priceItem.size === item._doc.size;
        });

        if(priceListItem.length === 0) {
            throw new Error(`could not find price for item name ${item._doc.name} and size ${item._doc.size}`);
        }
        return priceListItem[0].cost;
    }

    return {
        calculate: calculate
    }
}

module.exports = priceCalculator;
