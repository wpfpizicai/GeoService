/**
 * Main Entrance
 */

var express = require('express');
var path = require('path');
var http = require('http');
var routes = require('./routes');
var socket = require('./controller/socket');

// init an app
var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'static')));

// add session for track user
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

// add routes
routes(app);

// development only
if ('development' == app.get('env')) {
  	app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  	console.log('Express server listening on port ' + app.get('port'));
})
// establish socket io
// socket(http.createServer(app).listen(app.get('port'), function(){
//   	console.log('Express server listening on port ' + app.get('port'));
// }))