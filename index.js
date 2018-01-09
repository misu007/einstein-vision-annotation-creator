var sslRedirect = require('heroku-ssl-redirect');
var express = require('express');
var bodyParser = require('body-parser');
var async = require('async');
var main = require('./app/main.js');
var app = express();
var fs = require('fs');
var unzip = require('unzip2');
var csvSync = require('csv-parse/lib/sync');
var portNum = (process.env.PORT || 5000);
var server = app.listen(portNum, function(){
    console.log("Node app is running : " + server.address().port);
});

app.use(sslRedirect());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '700mb'}));
app.use(bodyParser.urlencoded({limit: '700mb', extended: true, parameterLimit:50000}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.render('pages/index', {});
	main.cleanSpool();	    
});


app.post('/save', function(req, res){
	try {
		async.waterfall([
			function(callback){
				if (!(fs.existsSync('./public/spool'))){  
					fs.mkdirSync('./public/spool');
				}
				var dat = new Buffer(req.body.b64, 'base64');
				var fileName = req.body.fileName;
				var filePath = './public/spool/' + fileName;
				fs.writeFile(filePath, dat, function(err){
					callback(null, fileName);
				}); 
			}], function (err, result){
				if(err){
					console.log('Error! ' + result);
				} else {
					res.send(result);
				}
			});
	} catch(err) {
		myError(err, res);
	}
});

app.post('/save_zip', function(req, res){
		var retObj = {};
		async.waterfall([
			function(callback){
				if (!(fs.existsSync('./public/spool'))){  
					fs.mkdirSync('./public/spool');
				}
				if (!(fs.existsSync('./data/zip'))){  
					fs.mkdirSync('./data/zip');
				}

				var dat = new Buffer(req.body.b64, 'base64');
				var fileName = req.body.fileName;
				var filePath = './data/zip/' + fileName;
				fs.writeFile(filePath, dat, function(err){
					callback(null, filePath);
				});
			},
			function(zipFilePath, callback){
				fs.createReadStream(zipFilePath)
				  .pipe(unzip.Parse())
				  .on('entry', function (entry) {
				    var i = entry.path;
				    var type = entry.type; // 'Directory' or 'File'
				    var size = entry.size;
				    if (i.match(/^examples\/.+/) && type == 'File'){
				    	var fileName = i.replace(/^examples\//g, '');
						var filePath = './public/spool/' + fileName;
						entry.pipe(fs.createWriteStream(filePath));
				    } else if (i == 'annotations.csv'){
				    	var csvData = '';
				    	entry.on('data', function (dat){
				    		csvData += dat;
						});
				    	entry.on('end', function (){
				    		var dat = csvData;
				    		var csvObj = {};
    						var fileList = [];
							var acsv = dat.toString();
							var recs = acsv.split(/\r\n|\r|\n/);
							for (var i = 1; i < recs.length; i++){
								var rec = recs[i].replace(/""/g, '"').replace(/"\{/g, '{').replace(/\}"/g, '}');
								var splits = rec.split(/,/);
								var thisName = splits[0].replace(/"/g, '');
								splits.shift();
								var rec2 = '[' + splits.join(',') + ']';
								if (thisName && thisName.length > 0){
									csvObj[thisName] = JSON.parse(rec2);
									fileList.push(thisName);
								}
								retObj = {csv: csvObj, files: fileList};
							}
				    	});
				    } else {
				      	entry.autodrain();
				    }
				  }).on('close', function(){
						callback(null, retObj);			  	
				  });
			}
		], function (err, result){
			if(err){
				console.log('Error! ' + result);
			} else {
				res.send(result);
			}
		});
});


app.post('/csv2zip', function(req, res){
	try {
		async.waterfall([
			function(callback){
				var csvObj = JSON.parse(req.body.csv);
				main.createZipFile(csvObj, callback);
			}], function (err, result){
				if(err){
					console.log('Error! ' + result);
				} else {
					res.send(result);
				}
			});
	} catch(err) {
		myError(err, res);
	}
});

module.exports = app;

function myError(err, res){
    res.send(err);
}


