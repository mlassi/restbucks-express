'use strict';

const sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect;

chai.should();

describe('Order Controller', function () {
    describe('ordering a beverage', function () {
        it('should return status 201 when the order was successful', function () {
            const ctrl = require('../../app/controllers/orderController')();
            let req, res;
            req = res = {};
            res.status = sinon.spy();

            ctrl.post(req, res);
            res.status.calledWith(201).should.be.true;
        })
    });
});
