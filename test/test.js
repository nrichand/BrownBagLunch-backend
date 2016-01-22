/*jshint globalstrict: true*/
"use strict";

var sinon = require('sinon'),
    chai = require("chai"),
    should = require('chai').should(),
    sinonChai = require("sinon-chai"),

    http = require('http'),

    app = require('../app.js'),
    index = require('../routes/index.js'),
    storage = require('../storage.js'),
    mailer = require('../mailer.js');

(function () {
    chai.use(sinonChai);

    describe('should log bbl usage :', function () {
        before(mockMongo);

        it('should return status 200', function (done) {
            http.get("http://localhost:8080/users/nrichand/hit", function (res) {
                res.statusCode.should.equal(200);
                done();
            });
        });

        it('should store a new hit for nrichand', function (done) {
            http.get("http://localhost:8080/users/nrichand/hit", function (res) {
                storage.save.should.have.been.calledWith('nrichand');
                done();
            });
        });
    });

    describe('should mail baggers :', function () {
        beforeEach(mockMailSend);
        afterEach(restoreMailer);

        it('should call send mail', function (done) {
            //Given
            var post_data = "from=nrichand@brownbaglunch.fr&to=foo@bar.com&subject=BBL&message=Yeah";

            //When
            sendPOSTMailRequest(post_data, success_callback, error_callback);

            //Then
            function success_callback(chunk) {
                mailer.send.should.have.been.calledWithMatch({from: "nrichand@brownbaglunch.fr",
                    to: "foo@bar.com",
                    subject: "BBL",
                    message: "Yeah"});
                done();
            }

            function error_callback(e) {
                e.message.should.be.empty();
                done();
            }
        });

        it('Bad mail <from> should return an error', function (done) {
            //Given
            var post_data = "from=nrichand&to=foo@bar.com&subject=BBL&message=Yeah";

            //When
            sendPOSTMailRequest(post_data, success_callback, error_callback);

            //Then
            function success_callback(chunk) {
                mailer.send.should.not.have.been.called;
                done();
            }

            function error_callback(e) {
                e.message.should.be.empty();
                done();
            }
        });

        it('Bad mail <to> should return an error', function (done) {
            //Given
            var post_data = "from=nrichand@gmail.com&to=foo&subject=BBL&message=Yeah";

            //When
            sendPOSTMailRequest(post_data, success_callback, error_callback);

            //Then
            function success_callback(chunk) {
                mailer.send.should.not.have.been.called;
                done();
            }

            function error_callback(e) {
                e.message.should.be.empty();
                done();
            }
        });
    });
})();

/*
 *  Utilities methods
 */

function mockMongo() {
    sinon.stub(storage, "save");
}

function mockMailSend() {
    sinon.stub(mailer, "send");
}

function restoreMailer() {
    mailer.send.restore();
}

function sendPOSTMailRequest(post_data, success_callback, error_callback) {
    var options = {
        hostname: 'localhost',
        port: 8080,
        path: '/mail',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }
    };

    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', success_callback);
    });

    req.on('error', error_callback);

    req.write(post_data);
    req.end();
}
