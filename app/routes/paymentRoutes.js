const express = require('express');
const orderModel = require('../models/orderModel');

const routes = function(){
    'use strict';
    const paymentRouter = express.Router();

    const paymentController = require('../controllers/paymentController')(orderModel.Order);

    paymentRouter.use('/:orderId', function(req,res,next){
        orderModel.Order.findById(req.params.orderId, function(err,order) {
            if (err || !order)
                res.status(500).send(err);
            else if (order) {
                req.order = order;
                next();
            }
        });
    });

    paymentRouter.route('/:orderId')
        .post(paymentController.post);

    return paymentRouter;
};

module.exports = routes;
