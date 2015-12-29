const orderController = function (Order, priceCalculator) {
    'use strict';

    const post = function (req, res) {
        const order = new Order(req.body);

        order.cost = priceCalculator.calculate(order);

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
    };

    const get = function (req, res) {
        res.status(200);
    };

    return {
        post: post,
        get: get
    }
};

module.exports = orderController;
