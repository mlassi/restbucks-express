const express = require('express');
const orderModel = require('../models/orderModel');
const beverageModel = require('../models/beverageModel');
const priceCalculator = require('../pricing/priceCalculator')();

const routes = function(){
    'use strict';
    const orderRouter = express.Router();

    const orderController = require('../controllers/orderController')(orderModel.Order, priceCalculator, beverageModel.Beverage);

    orderRouter.route('/beverage')
        .get(orderController.getBeverages);
    orderRouter.route('/:orderId')
        .get(orderController.get);
    orderRouter.route('/')
        .post(orderController.post);

    return orderRouter;
};

module.exports = routes;
