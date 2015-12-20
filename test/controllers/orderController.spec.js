'use strict';

const sinon = require('sinon'),
    chai = require('chai');

chai.should();

describe('Order Controller', function () {

    let req, res, models, saveStub;

    beforeEach(function() {
        models = require('../../app/models/orderModel');
        saveStub = sinon.stub();
        req = res = {};
        req.body = sinon.spy();
        res.status = sinon.spy();
        res.send = sinon.spy();
    });

    describe('ordering a beverage', function () {

        it('should return status 201 when the order was successful', sinon.test(function (done) {
            saveStub.yields(null);
            const Order = this.stub(models, 'Order');
            Order.returns({
                save: saveStub
            });
            const ctrl = require('../../app/controllers/orderController')(Order);

            ctrl.post(req, res);

            process.nextTick(function () {
                res.status.calledWith(201).should.be.true;
                done();
            });

        }));

        it('should save an order', sinon.test(function(done) {
            saveStub.yields(null);
            const Order = this.stub(models, 'Order');
            Order.returns({
                save: saveStub
            });

            const ctrl = require('../../app/controllers/orderController')(Order);
            ctrl.post(req, res);

            process.nextTick(function () {
                sinon.assert.calledOnce(saveStub);
                done();
            });


        }));

        it('should send http status 500 when an error occurs during save', sinon.test(function(done) {
            saveStub.yields({});
            const Order = this.stub(models, 'Order');
            Order.returns({
                save: saveStub
            });

            const ctrl = require('../../app/controllers/orderController')(Order);

            ctrl.post(req, res);

            process.nextTick(function () {
                res.status.calledWith(500).should.be.true;
                done();
            });

        }));
    });
});
