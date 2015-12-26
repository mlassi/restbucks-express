const express = require('express');
const orderModel = require('../models/orderModel');

const routes = function(){
    'use strict';
    const orderRouter = express.Router();

    const orderController = require('../controllers/orderController')(orderModel.Order);
    orderRouter.route('/')
        .post(orderController.post);

    return orderRouter;
};

module.exports = routes;
