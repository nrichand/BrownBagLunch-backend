/*global describe, it, before, require*/
/*jshint globalstrict: true*/
"use strict";

var should = require('chai').should(),
    assert = require('sinon').assert,
    sinon = require('sinon'),
    app = require('../../app.js'),
    http = require('http'),
    index = require('../../routes/index.js'),
    storage = require('../../storage.js'),
    mailer = require('../../mailer.js');

(function () {
    before(mockMongo);
    before(mockMailSend);

    describe('should log bbl usage :', function () {

        it('should return status 200', function (done) {
            http.get("http://localhost:3000/users/nrichand/hit",function (res) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('should store a new hit for nrichand', function (done) {
            http.get("http://localhost:3000/users/nrichand/hit",function (res) {
                assert.calledWith(storage.save, 'nrichand');
                done();
            });
        });
    });


    describe('should mail baggers :', function () {

        it('should call send mail', function (done) {
            var post_data = "from=nrichand@brownbaglunch.fr&to=foo@bar.com&subject=BBL&message=Yeah";

            var options = {
                hostname: 'localhost',
                port: 3000,
                path: '/mail',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': post_data.length
                }
            };

            var req = http.request(options, function (res) {
                res.setEncoding('utf8');

                res.on('data', function (chunk) {
                    assert.calledOnce(mailer.send);

                    assert.calledWith(mailer.send, sinon.match.has("from", "nrichand@brownbaglunch.fr"));
                    assert.calledWith(mailer.send, sinon.match.has("to", "foo@bar.com"));
                    assert.calledWith(mailer.send, sinon.match.has("subject", "BBL"));
                    assert.calledWith(mailer.send, sinon.match.has("message", "Yeah"));

                    done();
                });
            });

            req.on('error', function(e) {
                e.message.should.be.empty();
            });

            // write data to request body
            req.write(post_data);
            req.end();
        });
    });
})();

function mockMongo(){
    sinon.stub(storage, "save");
}

function mockMailSend(){
    sinon.stub(mailer, "send");
}
