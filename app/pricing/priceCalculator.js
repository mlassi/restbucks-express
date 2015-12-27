const priceCalculator = function () {

    function calculate(order) {
        return order._doc.items.reduce(function(total, item) {

            if(item._doc.name === 'latte') {
                total += 2 * item.quantity;
            }
            return total;
        }, 0);
    }

    return {
        calculate: calculate
    }
}

module.exports = priceCalculator;
