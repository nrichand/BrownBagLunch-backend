
/*
 * GET home page.
 */
var lastUser = '';
exports.lastUser = lastUser;

exports.index = function(req, res){
  res.render('index', { title: 'Welcome to bbl' });
};

exports.poke = function (req, res) {
    exports.lastUser = req.params.user;
  res.send(200);
};

