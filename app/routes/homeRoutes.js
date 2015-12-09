const express = require('express');

const routes = function(){
    const homeRouter = express.Router();

    const homeController = require('../controllers/homeController')();
    homeRouter.route('/')
        .get(homeController.get);

    return homeRouter;
};

module.exports = routes;
