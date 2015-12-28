'use strict';

const sinon = require('sinon'),
    chai = require('chai'),
    sinonChai = require('sinon-chai'),
    expect = require('chai').expect;
chai.use(sinonChai);

sinon.defaultConfig.useFakeTimers = false;

describe('Order Controller', function () {

    let req, res, models, saveStub, priceCalcStub;

    models = require('../../app/models/orderModel');

    function setupOrderCtrl(sandbox, saveYieldValue) {
        priceCalcStub = {
            calculate: sinon.spy()
        };
        saveStub = sinon.stub();
        req = {
            requestedURI: '/foo/bar',
            body: sinon.spy(),
            status: sinon.spy()
        };
        res = {
            status: sinon.spy(),
            send: sinon.spy(),
            location: sinon.spy()
        };
        saveStub.yields(saveYieldValue);
        const Order = sandbox.stub(models, 'Order');
        Order.returns({
            save: saveStub,
            _id: 123,
            _doc: {cost: 0}
        });
        const ctrl = require('../../app/controllers/orderController')(Order, priceCalcStub);
        return {
            controller: ctrl,
            order: Order
        }
    }

    describe('ordering a beverage', function () {
        it('should return status 201 when the order was successful', sinon.test(function (done) {
            const expected = 201;
            const mockOrderCtrl = setupOrderCtrl(this, null);

            mockOrderCtrl.controller.post(req, res);

            expect(res.status).to.have.been.calledWith(expected);
            done();
        }));

        it('should not send order back if it could not be saved', sinon.test(function (done) {
            const mockOrderCtrl = setupOrderCtrl(this, {});
            mockOrderCtrl.controller.post(req, res);

            res.send.called.should.be.false;
            done();

        }));


        it('should save an order', sinon.test(function (done) {
            const mockOrderCtrl = setupOrderCtrl(this, null);

            mockOrderCtrl.controller.post(req, res);

            sinon.assert.calledOnce(saveStub);
            done();
        }));

        it('should send http status 500 when an error occurs during save', sinon.test(function (done) {
            const expected = 500;
            const mockOrderCtrl = setupOrderCtrl(this, {});

            mockOrderCtrl.controller.post(req, res);

            expect(res.status).to.have.been.calledWith(expected);
            done();

        }));

        it('should set the location response with the entity id', sinon.test(function (done) {
            const expected = '/foo/bar/123';
            const mockOrderCtrl = setupOrderCtrl(this, null);

            mockOrderCtrl.controller.post(req, res);

            //process.nextTick(function () {
            expect(res.location).to.have.been.calledWith(expected);
            done();
            // })
        }));

        it('should calculate the price before saving the order', sinon.test(function(done) {
            const mockOrderCtrl = setupOrderCtrl(this, null);

            mockOrderCtrl.controller.post(req, res);

            sinon.assert.calledOnce(priceCalcStub.calculate);
            done();
        }));

    });
});
