"use strict";

var Bagger = require('../model/Bagger');
var resterror = require('resterror');

function updateBagger(req, res, next) {
	var id = res.loaded.bagger.id;

	Bagger.update(id, req.params.name, function(err, bagger){
		if(err){
			return next(err);
		}
		if(!bagger){
			return next(resterror.resourceNotFound());
		}
		res.send(200, bagger);
		next();
	});
}

module.exports = updateBagger;