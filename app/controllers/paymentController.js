const paymentController = function (Order) {
    'use strict';

    const post = function (req, res) {
        const order = req.order;
        setPayment(req, order);

        order.save(function (err) {
            if (err) {
                res.status(500);
            }
            else {
                res.status(200);
                res.json(order);
            }
        });

    };

    function setPayment(req, order) {
        order.payment.amount = req.body.amount;
        order.payment.cardHolderName = req.body.cardHolderName;
        order.payment.cardNumber = req.body.cardNumber;
        order.payment.cardType = req.body.cardType;
        order.payment.expiryMonth = req.body.expiryMonth;
        order.payment.expiryYear = req.body.expiryYear;
        order.status = "paid";
    }

    return {
        post: post
    }
};

module.exports = paymentController;
