'use strict';

const sinon = require('sinon'),
    chai = require('chai'),
    sinonChai = require('sinon-chai'),
    expect = require('chai').expect;
chai.use(sinonChai);

describe('Payment Controller', function () {

    let req, res, models, saveStub;

    models = require('../../app/models/orderModel');

    function setupOrderCtrl(sandbox, saveYieldValue) {
        saveStub = sinon.stub();
        saveStub.yields(saveYieldValue);
        const Order = sandbox.stub(models, 'Order');
        Order.returns({
            save: saveStub,
            _id: 123,
            _doc: {cost: 0}
        });
        req = {
            requestedURI: '/foo/bar',
            body: {order: new Order()},
            status: sinon.spy()
        };
        res = {
            status: sinon.spy(),
            send: sinon.spy(),
            location: sinon.spy()
        };

        const ctrl = require('../../app/controllers/paymentController')(Order);
        return {
            controller: ctrl,
            order: Order
        }
    }

    describe('Paying for an order', function () {

        it('should return HTTP status 200 when the payment was successfully applied', sinon.test(function (done) {

            const expected = 200;
            const mockOrderCtrl = setupOrderCtrl(this, null);

            mockOrderCtrl.controller.post(req, res);

            expect(res.status).to.have.been.calledWith(expected);
            done();

        }));

        it('should save the updated order with the payment information', sinon.test(function (done) {
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

            expect(res.location).to.have.been.calledWith(expected);
            done();
        }));

    });

});
