const homeController = function () {
    'use strict';

    const get = function (req, res) {
        res.json('Welcome to Restbucks Express style!');
    }

    return {
        get: get
    }
}

module.exports = homeController;
