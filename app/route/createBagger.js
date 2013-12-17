"use strict";

var Bagger = require('../model/Bagger');

function createBagger(req, res, next) {
	Bagger.create(req.params.name,function (err, created) {
		if (err) {
			return next(err);
		}
		res.send(201, created);
		next();
	});
}

module.exports = createBagger;