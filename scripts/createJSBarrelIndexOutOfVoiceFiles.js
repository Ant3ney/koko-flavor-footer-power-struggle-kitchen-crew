//Create Js barrel Index Out Of Voice Files
const path = require('path');
const fs = require('fs');
const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, '../GameLogic/AudioSystem/sounds/voices');

fs.readdir(directoryPath, function (err, files) {
	if (err) {
		return console.log('Unable to scan directory: ' + err);
	}

	console.log('Checking if there are an even number of voice acting files');

	files.forEach(function (file) {
		console.log(file);
	});
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
