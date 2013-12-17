"use strict";

var Bagger = require('../model/').Bagger;
var resterror = require('resterror');
var utils = require('../model/utils');

function loadSession (req, res, next) {
	if (!utils.isObjectId(req.params.id)) {
		return next(resterror.resourceNotFound());
	}

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