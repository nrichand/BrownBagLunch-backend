/*global describe, it */
'use strict';

var should = require('chai').should(),
    app = require('../../app.js'),
    http = require('http'),
    index = require('../../routes/index.js');

(function () {
    describe('should log bbl usage', function () {
        it('should return status 200', function () {
            http.get("http://localhost:3000/users/nrichand/poke",function (res) {
                res.statusCode.should.equal(200);
            });
        });

        it('should poke nrichand', function () {
            http.get("http://localhost:3000/users/nrichand/poke",function (res) {
                index.lastUser.should.equal('nrichand');
            });
        });
    });
})();
