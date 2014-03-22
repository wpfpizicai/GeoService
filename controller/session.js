var crypto = require('crypto');
var generate_key = function(){
	var sha = crypto.createHash('sha256');
	sha.update(Math.random().toString());
	return sha.digest('hex');
}
module.exports = function (req) {
	if(!req.session.user_id){
		req.session.user_id = generate_key();
	}
}