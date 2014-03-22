var geoContl = require('../controller/geo_contl');

module.exports = function(app){
	var res_txt = "";

	app.get('/', function(req, res){
  		res.render('index');
	});

    app.get('/findnear',function (req,res) {
        geoContl.findNear(req.query,res)
    });

    app.get('/findall' ,function (req ,res) {
        geoContl.findAll(res)
    });

    app.post('/addgeo',function (req,res) {
        geoContl.addGeo(req.body,res);
    });
}