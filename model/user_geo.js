var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
 
var geoSchema = new Schema({
    name: String,
    date: {
    	type: Date, 
    	default: Date.now
    }, 
    geo : {type: [Number], index: '2d'}
});

mongoose.connect('mongodb://localhost:27017/userGeo');
module.exports = mongoose.model('geoModel', geoSchema ,'data');
