const paymentController = function (Order) {
    'use strict';

    const post = function (req, res) {
        const order = req.body.order;

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
