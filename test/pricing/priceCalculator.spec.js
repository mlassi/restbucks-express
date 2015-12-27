'use strict';

const sinon = require('sinon'),
    chai = require('chai'),
    sinonChai = require('sinon-chai'),
    expect = require('chai').expect,
    priceCalculator = require('../../app/pricing/priceCalculator')();
chai.use(sinonChai);

describe('Price Calculator', function () {

    let order;

    beforeEach(function () {
        const model = require('../../app/models/orderModel');
        order = new model.Order();
    });

    function createItem(name, quantity, size) {
        return {name: name, quantity: quantity, size: size};
    }

    describe('small lattes', function () {
        it('should calculate the price for one small latte', function () {
            const expected = 2;
            order._doc.items.push(createItem('latte', 1, 'small'));

            const actual = priceCalculator.calculate(order);

            expect(actual).to.equal(expected);
        });

        it('should calculate the price for five small lattes', function () {
            const expected = 10;
            order._doc.items.push(createItem('latte', 5, 'small'));

            const actual = priceCalculator.calculate(order);

            expect(actual).to.equal(expected);
        });

        it('should calculate the price for five small lattes as two separate items', function () {
            const expected = 20;
            order._doc.items.push(createItem('latte', 5, 'small'), createItem('latte', 5, 'small'));

            const actual = priceCalculator.calculate(order);

            expect(actual).to.equal(expected);
        });

    });

    describe('item not found in price list', function () {

        it('should throw error if the item can\t be found in the price list', function () {

            order._doc.items.push(createItem('foo', 1, 'small'));

            expect(function() {
                priceCalculator.calculate(order);
            }).to.throw(Error, /could not find price for item name foo and size small/);
        });
    });

});
