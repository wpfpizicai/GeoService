
module.exports = function(app){
	var io = require('socket.io').listen(app);
	io.sockets.on('connection', function (socket) {
	  	socket.emit('news', { hello: 'world' });
	  	socket.on('online', function (data) {
	   	 	console.log(data);
	  	});
	});
}