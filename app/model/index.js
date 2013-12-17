"use strict";

exports.Bagger = require('./Bagger');
exports.all = Object.getOwnPropertyNames(exports).map(function(prop){
	return exports[prop];
});