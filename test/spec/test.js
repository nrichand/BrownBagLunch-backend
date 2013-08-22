/*global describe, it, before, require*/
/*jshint globalstrict: true*/
"use strict";

var should = require('chai').should(),
    assert = require('sinon').assert,
    sinon = require('sinon'),
    app = require('../../app.js'),
    http = require('http'),
    index = require('../../routes/index.js'),
    storage = require('../../storage.js');

(function () {
    describe('should log bbl usage', function () {
        before(mockMongo);

        it('should return status 200', function () {
            http.get("http://localhost:3000/users/nrichand/hit",function (res) {
                res.statusCode.should.equal(200);
            });
        });

        it('should store a new hit for nrichand', function () {
            http.get("http://localhost:3000/users/nrichand/hit",function (res) {
                assert.calledWith(storage.save, 'nrichand');
            });
        });
    });
})();

function mockMongo(){
    sinon.spy(storage, "save");
}