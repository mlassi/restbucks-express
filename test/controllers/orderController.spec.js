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

    function setupOrderCtrl(sandbox, saveYieldValue) {
        saveStub.yields(saveYieldValue);
        const Order = sandbox.stub(models, 'Order');
        Order.returns({
            save: saveStub
        });
        const ctrl = require('../../app/controllers/orderController')(Order);
        return ctrl;
    }

    describe('ordering a beverage', function () {

        it('should return status 201 when the order was successful', sinon.test(function (done) {
            const ctrl = setupOrderCtrl(this, null);

            ctrl.post(req, res);

            res.status.calledWith(201).should.be.true;
            done();
        }));

        it('should not send order back if it could not be saved', sinon.test(function (done) {
            const ctrl = setupOrderCtrl(this, {});

            ctrl.post(req, res);

            res.send.called.should.be.false;
            done();

        }));


        it('should save an order', sinon.test(function(done) {
            const ctrl = setupOrderCtrl(this, null);

            ctrl.post(req, res);

            sinon.assert.calledOnce(saveStub);
            done();
        }));

        it('should send http status 500 when an error occurs during save', sinon.test(function(done) {
            const ctrl = setupOrderCtrl(this, {});

            ctrl.post(req, res);

            res.status.calledWith(500).should.be.true;
            done();

        }));
    });
});
