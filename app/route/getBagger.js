"use strict";

function getBagger(req, res, next) {
	res.send(200, res.loaded.bagger);
	next();	
}

module.exports = getBagger;