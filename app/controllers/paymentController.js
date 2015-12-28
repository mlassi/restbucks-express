const paymentController = function (Order) {
    'use strict';

    const post = function (req, res) {
        const order = new Order(req.body);

        order.save(function (err) {
            if (err) {
                res.status(500);
            }
            else {
                res.status(200);
                res.location(`${req.requestedURI}/${order._id}`)
            }
        });

    };

    return {
        post: post
    }
};

module.exports = paymentController;
