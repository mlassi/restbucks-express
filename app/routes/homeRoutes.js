const express = require('express');

const routes = function(){
    'use strict';
    const homeRouter = express.Router();

    const homeController = require('../controllers/homeController')();
    homeRouter.route('/')
        .get(homeController.get);

    return homeRouter;
};

module.exports = routes;
