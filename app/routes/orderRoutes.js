const express = require('express');
const Order = require('../models/orderModel');

const routes = function(){
    const orderRouter = express.Router();

    const orderController = require('../controllers/orderController')(Order);
    orderRouter.route('/')
        .post(orderController.post);

    return orderRouter;
};

module.exports = routes;
