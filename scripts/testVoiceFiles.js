//Code modified from VithalReddy from medium.com
//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory
const directoryPath = path.join(__dirname, '../GameLogic/AudioSystem/sounds/voices');
//passing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
	if (err) {
		return console.log('Unable to scan directory: ' + err);
	}

	console.log('Checking if there are an even number of voice acting files');

	let [m, f] = [0, 0];
	files.forEach(function (file) {
		if (file.indexOf('male') === 0) m++;
		if (file.indexOf('female') >= 0) f++;
	});

	console.log(m + ' male voices & ' + f + ' female voices');

	const testResult = files.length % 2 === 0;

	console.log(
		`Test ${
			testResult
				? 'Succeeded: files.length % 2 === 0 = ' + testResult
				: 'Failed: files.length % 2 === 0 = ' + testResult
		}`,
		'',
		'files.length: ' + files.length
	);
});
