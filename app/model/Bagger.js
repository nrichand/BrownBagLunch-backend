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

function listAll(callback) {
	Bagger.find({}, callback);
}

function update(id, name, callback) {
	name = name || null;

	Bagger.findById(id, function (err, bagger) {
		if (err) {
			return callback(err);
		}
		if (!bagger) {
			return callback();
		}

		bagger.update({name : name}, function (err) {
			if (err){
				return callback(err);
			}
			bagger['name'] = name;
			callback(null, bagger);
		});
	});
}

function findById(id, callback) {
	Bagger.findById(id, callback);
}

var dao = {
	create : create,
	listAll: listAll,
	findById : findById,
	update : update
};

module.exports = dao;
