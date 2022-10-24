//Code modified from VithalReddy from medium.com
const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, '../GameLogic/AudioSystem/sounds/voices');

function runVoiceTest() {
	console.log('Running Custom Build Test');
	return new Promise((res, rej) => {
		fs.readdir(directoryPath, function (err, files) {
			if (err) return rej(err);

			console.log('Checking if there are an even number of voice acting files');

			let [m, f] = [0, 0];
			files.forEach(function (file) {
				if (file.indexOf('male') === 0) m++;
				if (file.indexOf('female') >= 0) f++;
			});

			console.log(m + ' male voices & ' + f + ' female voices');

			const testResult = (files.length % 2 === 0) - 1;
			const testMessage = testResult
				? 'Succeeded: (files.length % 2 === 0) - 1 = ' + testResult
				: 'Failed: (files.length % 2 === 0) - 1 = ' + testResult;

			console.log(`Test ${testMessage}`, '', 'files.length: ' + files.length);

			if (testResult) res({ testResult, message: testMessage });
			else rej({ message: testMessage });
		});
	});
}

module.exports = runVoiceTest;
