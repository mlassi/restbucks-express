const orderController = function (Order, priceCalculator, Beverage) {
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
        Order.findById(req.params.orderId, function(err,order) {
            if(err) {
                res.status(404);
            }
            else {
                res.status(200);
                res.send(order);
            }
        });
    };

    const getBeverages = function (req, res) {
        Beverage.find({}, function(err,beverages) {
            if(err) {
                res.status(404);
            }
            else {
                res.status(200);
                res.send(beverages);
            }
        });
    };

    return {
        post: post,
        get: get,
        getBeverages: getBeverages
    }
};

module.exports = orderController;
