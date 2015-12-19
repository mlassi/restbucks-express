'use strict';

const sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    mongoose = require('mongoose');

chai.should();

describe('Order Controller', function () {

    let req, res;

    beforeEach(function() {
        req = res = {};
        req.body = sinon.spy();
        res.status = sinon.spy();
        res.send = sinon.spy();
    });

    describe('ordering a beverage', function () {
        const Order = require('../../app/models/orderModel');

        it('should return status 201 when the order was successful', function () {

            const ctrl = require('../../app/controllers/orderController')(Order);

            ctrl.post(req, res);
            res.status.calledWith(201).should.be.true;
        })

        it('should save an order', function() {
            const OrderModel = mongoose.model('Order');

            const ctrl = require('../../app/controllers/orderController')(OrderModel);
            ctrl.post(req, res);

            res.send.called;
        })
    });
});
