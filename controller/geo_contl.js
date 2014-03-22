var LIMITCOUNT = 10,
	DISTANCE = 7;

var GeoModel = require('../model/user_geo'),
	parseArr = function (data){
		var arr = [];
		for (var i = 0 , len = data.length; i < len; i++) {
			arr[i] = parseFloat(data[i]);
		};
		return arr;
	};

exports.findNear = function (data,res) {
	var coord = [parseFloat(data.lon),parseFloat(data.lat)],
  		distance = (data.radi*10 || DISTANCE) / 111.12,
  		callback = function(err,resultset) {
		    if (!err) {
		      	res.send({data:resultset});
		    } else {
		      	throw err;
		    }
		};
  	var q =GeoModel.find({geo: { $near: coord, $maxDistance: distance }}).limit(LIMITCOUNT);
  	q.exec(callback);
};

exports.findAll = function (res) {
	var callback = function (err,resultset) {
		if (!err) {
	      	res.send({data:resultset});
	    } else {
	      	throw err;
	    }
	};
	var q = GeoModel.find().limit(LIMITCOUNT + 10);
	q.exec(callback)
};

exports.addGeo = function (data,res) {
	var myGeo = new GeoModel({
			name : data.name ,
			geo : parseArr(data.coord)
		}),
		callback = function(err,resultset) {
		    if (!err) {
		      	res.send({data:resultset});
		    } else {
		      	throw err;
		    }
		};
	myGeo.save(callback);
}


