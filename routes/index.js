
var storage = require('../storage.js');

exports.index = function(req, res){
  res.render('index', { title: 'Welcome to bbl' });
};

exports.hit = function (req, res) {
  storage.save(req.params.user);
  res.send(200);
};

exports.mail =  function (req, res) {
    console.log('find from : '+req.body.from);
    res.send(200);
};

