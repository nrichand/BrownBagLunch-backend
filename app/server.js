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
		.path(":id").use(route.loadBagger)
			.put(route.updateBagger)
			.get(route.getBagger)
	;

	// (FARV) Cors Header in trash mode
	// This is trashy but already planned in the next Silence release
	// Do not forget to remove after upgrading
	function setCorsHeaders(res, next, err) {
		res.setHeader('Access-Control-Allow-Origin', "*");
		res.setHeader('Access-Control-Allow-Headers', ['Content-type'].join(", "));
		res.setHeader('Access-Control-Allow-Methods', (res.allowedMethods || []).join(", "));
		next(err);
	}
	app.after(function corsHeaders(err, req, res, next) {
		setCorsHeaders(res, next, err);
	});
	app.after(function corsHeaders(req, res, next) {
		setCorsHeaders(res, next, null);
	});


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