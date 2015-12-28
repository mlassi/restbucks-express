const orderController = function (Order, priceCalculator) {
    'use strict';

    const post = function (req, res) {
        var order = new Order(req.body);

        order._doc.cost = priceCalculator.calculate(order);

        order.save(function (err) {
            if (err) {
                res.status(500);
            }
            else {
                res.status(201);
                res.location(`${req.requestedURI}/${order._id}`);
                res.send(order);
            }
        });
    }

    return {
        post: post
    }
}

module.exports = orderController;
