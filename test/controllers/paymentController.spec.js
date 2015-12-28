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

    });

});
