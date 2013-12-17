"use strict";

var mongoose = require('mongoose');


function create(dbUrl, options, models){
	
	var db = mongoose.connection;
	var myDb = {
		connect : function (callback) {
			mongoose.connect(dbUrl, options, callback);
		},
		disconnect :  function (callback) {
			mongoose.disconnect(callback);
		}
	}
	return myDb;
}


module.exports =create;