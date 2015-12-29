'use strict';

const sinon = require('sinon'),
    chai = require('chai'),
    sinonChai = require('sinon-chai'),
    expect = require('chai').expect,
    ObjectId = require('mongoose').Types.ObjectId;

chai.use(sinonChai);

sinon.defaultConfig.useFakeTimers = false;

const models = require('../../app/models/orderModel');

let req, res, findStub;

function setupMiddleware(req, res) {
    req = {
        requestedURI: '/foo/bar',
        body: sinon.spy(),
        status: sinon.spy(),
        params: {orderId: new ObjectId('5681e24e6f3d57ca2847eeb3')}
    };
    res = {
        status: sinon.spy(),
        send: sinon.spy(),
        location: sinon.spy(),
        json: sinon.spy()
    };
}


function setupOrderSaveCtrl(sandbox, saveYieldValue) {

    req = {
        requestedURI: '/foo/bar',
        body: sinon.spy(),
        status: sinon.spy(),
        params: {orderId: new ObjectId('5681e24e6f3d57ca2847eeb3')}
    };
    res = {
        status: sinon.spy(),
        send: sinon.spy(),
        location: sinon.spy(),
        json: sinon.spy()
    };

    const priceCalcStub = {
        calculate: sinon.spy()
    };
    const saveStub = sinon.stub();

    let Order = sandbox.stub(models, 'Order');
    saveStub.yields(saveYieldValue);

    Order.returns({
        save: saveStub,
        _id: 123,
        _doc: {cost: 0}
    });

    const ctrl = require('../../app/controllers/orderController')(Order, priceCalcStub);

    return {
        controller: ctrl,
        order: Order,
        saveStub: saveStub,
        priceCalcStub: priceCalcStub
    }
}

function setupOrderFindCtrl(sandbox, findValue) {

    req = {
        requestedURI: '/foo/bar',
        body: sinon.spy(),
        status: sinon.spy(),
        params: {orderId: new ObjectId('5681e24e6f3d57ca2847eeb3')}
    };
    res = {
        status: sinon.spy(),
        send: sinon.spy(),
        location: sinon.spy(),
        json: sinon.spy()
    };

    findStub = sinon.stub(models.Order, 'findById');
    let Order = sandbox.stub(models, 'Order');

    Order.returns({
        findById: findStub,
        _id: 123
    });
    findStub.yields(findValue ? null: findValue , findValue);

    const ctrl = require('../../app/controllers/orderController')(Order, null);
    return {
        controller: ctrl,
        order: Order
    }
}

describe('Order Controller', function () {


    describe('ordering a beverage', function () {
        it('should return status 201 when the order was successful', sinon.test(function (done) {
            const expected = 201;
            const mockOrderCtrl = setupOrderSaveCtrl(this, null, setupMiddleware);

            mockOrderCtrl.controller.post(req, res);

            expect(res.status).to.have.been.calledWith(expected);
            done();
        }));

        it('should not send order back if it could not be saved', sinon.test(function (done) {
            req = null, res = null;
            const mockOrderCtrl = setupOrderSaveCtrl(this, {}, setupMiddleware);
            mockOrderCtrl.controller.post(req, res);

            res.send.called.should.be.false;
            done();

        }));


        it('should save an order', sinon.test(function (done) {
            req = null, res = null;
            const mockOrderCtrl = setupOrderSaveCtrl(this, null, setupMiddleware);

            mockOrderCtrl.controller.post(req, res);

            sinon.assert.calledOnce(mockOrderCtrl.saveStub);
            done();
        }));

        it('should send http status 500 when an error occurs during save', sinon.test(function (done) {
            req = null, res = null;
            const expected = 500;
            const mockOrderCtrl = setupOrderSaveCtrl(this, {}, setupMiddleware);

            mockOrderCtrl.controller.post(req, res);

            expect(res.status).to.have.been.calledWith(expected);
            done();

        }));

        it('should set the location response with the entity id', sinon.test(function (done) {
            const expected = '/foo/bar/123';
            const mockOrderCtrl = setupOrderSaveCtrl(this, null, setupMiddleware);

            mockOrderCtrl.controller.post(req, res);

            //process.nextTick(function () {
            expect(res.location).to.have.been.calledWith(expected);
            done();
            // })
        }));

        it('should calculate the price before saving the order', sinon.test(function (done) {
            const mockOrderCtrl = setupOrderSaveCtrl(this, null, setupMiddleware);

            mockOrderCtrl.controller.post(req, res);

            sinon.assert.calledOnce(mockOrderCtrl.priceCalcStub.calculate);
            done();
        }));

    });

    describe('viewing an existing order', function () {

        afterEach(function () {
           if(findStub) {
               findStub.restore();
           }
        });

        it('should return status 200 when the order could be retrieved', sinon.test(function (done) {
            const expected = 200;
            const mockOrderCtrl = setupOrderFindCtrl(this, {_id: 123}, setupMiddleware);

            mockOrderCtrl.controller.get(req, res);
            mockOrderCtrl.find
            expect(res.status).to.have.been.calledWith(expected);
            done();
        }));

        it('should call return an order if it could be retrieved', sinon.test(function (done) {

            var expected = {_id: 123};
            const mockOrderCtrl = setupOrderFindCtrl(this, {_id: 123}, setupMiddleware);

            mockOrderCtrl.controller.get(req, res);

            process.nextTick(function () {
                //sinon.assert.calledOnce(findStub);
                expect(res.send).to.have.been.calledWith({_id: 123});
                done();
            })

        }));

    });
});
