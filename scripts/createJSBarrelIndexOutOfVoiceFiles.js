//Create Js barrel Index Out Of Voice Files
/* The purpose of this file create an index.ts file that imports and exports all voice audio files from the 
/GameLogic/AudioSystem/sounds/voices directory. */

const path = require('path');
const fs = require('fs');
const destinationDir = '../GameLogic/AudioSystem/sounds/voices';
const directoryPath = path.join(__dirname, destinationDir);
const indexDir = path.join(directoryPath, 'index.ts');

//unlink deletes files
fs.unlink(indexDir, err => {
	if (err && !err.message?.includes('no such file or directory')) throw err;

	const fileContents = [];
	fs.readdir(directoryPath, function (err, files) {
		if (err) {
			return console.log('Unable to scan directory: ' + err);
		}

		//Importing audio files
		files.forEach((fileNameWExt) /* with extension */ => {
			if (fileNameWExt === 'index.ts') return;
			const fileName = fileNameWExt.split('.mp3')[0];
			fileContents.push(`import ${fileName} from "./${fileNameWExt}";`);
		});

		//Exporting audio files
		fileContents.push(`\nexport default {`);
		files.forEach((fileNameWExt) /* with extension */ => {
			if (fileNameWExt === 'index.ts') return;
			const fileName = fileNameWExt.split('.mp3')[0];
			fileContents.push(`    ${fileName},`);
		});
		fileContents.push(`};`);

		fs.appendFile(indexDir, fileContents.join('\n'), err => {
			if (err) return console.error(err);
			console.log('Successfully built TS barrel index file!');
		});
	});
});
