var req = require('request');
var fs = require('fs');
var archiver = require('archiver');
var moment = require('moment');



exports.splitText = function(str, length) {
	var resultArr = [];
	if (!str || !length || length < 1) {
		return resultArr;
	}
	var index = 0;
	var start = index;
	var end = start + length;
	while (start < str.length) {
		resultArr[index] = str.substring(start, end);
		index++;
		start = end;
		end = start + length;
	}
	return resultArr;
}



exports.cleanSpool = function(){
	if (!(fs.existsSync('./spool') && fs.statSync('./spool').isDirectory())) {  
		fs.mkdirSync('./spool');
	}

	if (!(fs.existsSync('./public/spool') && fs.statSync('./public/spool').isDirectory())) {  
		fs.mkdirSync('./public/spool');
	}
	if (!(fs.existsSync('./public/data') && fs.statSync('./public/data').isDirectory())) {  
		fs.mkdirSync('./public/data');
	}
	if (!(fs.existsSync('./data') && fs.statSync('./data').isDirectory())) {  
		fs.mkdirSync('./data');
	}
	if (!(fs.existsSync('./data/zip') && fs.statSync('./data/zip').isDirectory())) {  
		fs.mkdirSync('./data/zip');
	}

	fs.readdir('./spool/', function(err, files){
		if (err){
			console.log(err);
		} else {
			console.log('Spool files : ' + files.length);			
			var targetTime = moment().subtract(1, 'hours');
			for (var i=0; i<files.length; i++){
				var filePath = './spool/' + files[i];
				var createTime = moment(fs.statSync(filePath).atime);
				if (createTime.isBefore(targetTime)){
					fs.unlinkSync(filePath);
				}
			}
		}
	});

}

exports.createZipFile = function(csvObj, callback){
	if (!(fs.existsSync('./public/data'))) {  
		fs.mkdirSync('./public/data');
	}
	var fileName = getRandomStr() + '.zip';
	var filePath = '/data/' + fileName;
	var output = fs.createWriteStream('./public' + filePath);
	output.on('close', function() {
		callback(null, {
			name : fileName,
			url : filePath
		});
	});
	var archive = archiver('zip', {
    	zlib: { level: 9 }
	});
	archive.pipe(output);
	archive.append(csvObj.csv, { name: 'annotations.csv' });
	var data = csvObj.file;
	for (var key in data){
		if (data.hasOwnProperty(key)){
			archive.append(fs.createReadStream('./public/spool/' + key), { name: 'examples/' + key });
		}
	}
	archive.finalize();

}

function getRandomStr(){
	return Math.floor(100000000000000000 * Math.random()).toString(32);
}




