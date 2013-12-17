"use strict";

var options = {
	server : {
		name : 'BBL',
		port : 8081	
	},
	db : {
		url : "mongodb://localhost/bbl",
		options : {
			server : { connectTimeoutMS : 10000 }
		}
	}
};

module.exports = options;