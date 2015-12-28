const express = require('express');
const orderModel = require('../models/orderModel');
const priceCalculator = require('../pricing/priceCalculator')();

const routes = function(){
    'use strict';
    const orderRouter = express.Router();

    const orderController = require('../controllers/orderController')(orderModel.Order, priceCalculator);
    orderRouter.route('/')
        .post(orderController.post);

    return orderRouter;
};

module.exports = routes;
