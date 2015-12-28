const paymentController = function (Order) {
    'use strict';

    const post = function (req, res) {
        res.status(200);
    };

    return {
        post: post
    }
};

module.exports = paymentController;
