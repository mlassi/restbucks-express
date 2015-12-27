'use strict';

const sinon = require('sinon'),
    chai = require('chai'),
    sinonChai = require('sinon-chai'),
    expect = require('chai').expect,
    priceCalculator = require('../../app/pricing/priceCalculator')();
chai.use(sinonChai);

describe('Price Calculator', function () {

    let models;

    beforeEach(function () {
        models = require('../../app/models/orderModel');
    });


    it('should calculate the price for one small latte', function () {
        const expected = 2;
        const order = new models.Order();
        order._doc.items.push({name: 'latte', quantity:1, size: 'small'});

        const actual = priceCalculator.calculate(order);

        expect(actual).to.equal(expected);

    });

});
