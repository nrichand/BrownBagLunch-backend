/*jshint globalstrict: true*/
"use strict";

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
  app.set('ip', process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1");
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-Type,x-requested-with");
    next();
});

app.get('/', routes.index);
app.post('/mail', routes.mail);
app.get('/users/:user/hit', routes.hit);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
