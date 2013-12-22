"use strict";

var silence = require('silence');
var http = require("http");
var route = require("./route/");
var models = require("./model/");
var db = require('./db');

function create(options){
	
	var app = silence({
		logger : true,
		cors : {
			allowedOrigins : ['*'],
			allowedHeaders : ['Content-Type'],
			exposedHeaders : ['Content-Type']
		}
	});

	app.getRouter()
		.post(route.createBagger)
		.get(route.listBagger)
		.path(":id", route.loadBagger)
			.put(route.updateBagger)
			.get(route.getBagger)
	;

	var server = http.createServer(app.build());

	var serverDb = db(options.db.url, options.db.options.server, models.all);
	
	function start (callback) {
		serverDb.connect(function (err) {
			if (err) {
				return callback(err);
			}
			server.listen(options.server.port, callback);
		});
	}

	function shutdown (callback) {
		serverDb.disconnect(function (err) {
			if (err) {
				return callback(err);
			}
			server.close(callback);
		});
	}

	return {
		start : start,
		shutdown : shutdown
	};
}
exports.create = create;
