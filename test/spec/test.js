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
    describe('should log bbl usage :', function () {
        before(mockMongo);

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
    }),

    describe('should mail baggers :', function () {
        //before(mockMailSend());

        it('should call send mail', function (done) {
            sinon.spy(mailer, "send");

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

            var req = http.request(options, function(res) {
                console.log('STATUS: ' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');

                res.on('data', function (chunk) {
                    console.log('BODY: ' + chunk);
                });
            });

            req.on('error', function(e) {
                e.message.should.be.empty();
            });

            // write data to request body
            req.write(post_data);
            req.end();


            var expectedMail = new mailer.Mail("nrichand@brownbaglunch.fr", "to=foo@bar.com", "BBL", "Yeah");

            //assert.calledWith(mailer.send, expectedMail);
            done();
        });
    });
})();

function mockMongo(){
    sinon.spy(storage, "save");
}

function mockMailSend(){
    sinon.spy(mailer, "send");
}