var storage = require('../storage.js'),
    mailer = require('../mailer.js'),
    check = require('validator').check;

exports.index = function (req, res) {
    res.render('index', { title: 'Welcome to bbl' });
};

exports.hit = function (req, res) {
    storage.save(req.params.user);
    res.send(200);
};

exports.mail = function (req, res) {

    try {
        check(req.body.from).isEmail();
        check(req.body.to).isEmail();

        var email = new mailer.Mail(req.body.from, req.body.to, req.body.subject, req.body.message);
        mailer.send(email);
        res.send(200);
    } catch (e) {
        res.send(400, e.message);
    }
};
