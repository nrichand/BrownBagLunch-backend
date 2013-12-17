"use strict";

var mongoose = require('mongoose');

function createResetAll(models,finalCallback){

	function createReset(model,thisCallback){
		var f = function(err){
			if(err){
				finalCallback(err);
			}
			model.remove(thisCallback);
		};
		return f;
	}
	var lastMethod= finalCallback;
	
	models.forEach(function(model){
		var thisRemove = createReset(model, lastMethod);
		lastMethod= thisRemove;
	});
	return lastMethod;
}

function create(dbUrl, options, models){
	
	var db = mongoose.connection;
	var myDb = {
		connect : function (callback) {
			mongoose.connect(dbUrl, options, callback);
		},
		disconnect :  function (callback) {
			mongoose.disconnect(callback);
		},
		resetDb: function (callback) {
			var allReset = createResetAll(models, callback);
			allReset();
			return ;
		}	
	}
	return myDb;
}


module.exports =create;