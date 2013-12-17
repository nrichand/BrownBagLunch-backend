"use strict";

var Bagger = require('../model/').Bagger;
var resterror = require('resterror');

function loadSession (req, res, next) {
	Bagger.findById(req.params.id, function (err, bagger) {
		if(err){
			return next(err);
		}
		if(!bagger){
			return next(resterror.resourceNotFound());
		}
		res.loaded = res.loaded || {};
		res.loaded['bagger'] = bagger;
		next();
	});
}

module.exports = loadSession;