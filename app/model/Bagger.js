"use strict";

var mongoose = require('mongoose');

var baggerSchema =  new mongoose.Schema({
	name : { type: String }
});

var Bagger = mongoose.model('bagger',baggerSchema);

function create(name, callback) {
	var obj = {
		name : name
	};

	Bagger.create(obj, callback);
}

var dao = {
	create : create
};

module.exports = dao;
