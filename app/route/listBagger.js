"use strict";

var Bagger = require('../model/Bagger');

function listBagger(req, res, next) {
	Bagger.listAll(function (err, baggers) {
		if (err) {
			return next(err);
		}
		res.send(200, baggers);
		next();
	});
}

module.exports = listBagger;