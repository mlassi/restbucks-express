'use strict';

const sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect;

chai.should();

describe('Home Controller', function () {
    describe('get', function () {
        it('should return a welcome message', function () {

            let spy, req, res, ctrl = require('../../app/controllers/homeController')();
            req = res = {};
            spy = res.json = sinon.spy();
            ctrl.get(req, res);

            res.json.calledWith('Welcome to Restbucks Express style!').should.equal(true);
        })
    })
})
