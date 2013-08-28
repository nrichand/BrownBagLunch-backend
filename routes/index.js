
var storage = require('../storage.js'),
    mailer = require('../mailer.js');

exports.index = function(req, res){
  res.render('index', { title: 'Welcome to bbl' });
};

exports.hit = function (req, res) {
  storage.save(req.params.user);
  res.send(200);
};

exports.mail =  function (req, res) {
    console.log('find from : '+req.body.from);

    var email = new mailer.Mail("nrichand@brownbaglunch.fr", "to=foo@bar.com", "BBL", "Yeah");

    mailer.send(email);

    res.send(200);
};

