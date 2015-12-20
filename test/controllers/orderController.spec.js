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

        xit('should return status 201 when the order was successful', function (done) {
            const Order = function(order) {this.save = function(){return null}};
            const ctrl = require('../../app/controllers/orderController')(Order);

            ctrl.post(req, res);

            process.nextTick(function () {
                res.status.calledWith(201).should.be.true;
                done();
            });

        });

        xit('should save an order', function() {
            const OrderModel = mongoose.model('Order');

            const ctrl = require('../../app/controllers/orderController')(OrderModel);
            ctrl.post(req, res);

            res.send.called;
        });

        xit('should send http status 500 when an error occurs during save', function(done) {
            const Order = function(order) {this.save = function() { return 'error';}};
            const ctrl = require('../../app/controllers/orderController')(Order);

            ctrl.post(req, res);

            process.nextTick(function () {
                res.status.calledWith(500).should.be.true;
                done();
            });

        });
    });
});
