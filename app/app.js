"use strict";

var config = require("./config");
var server = require('./server');
server.create(config).start(function () {
	console.log("Server running");
});