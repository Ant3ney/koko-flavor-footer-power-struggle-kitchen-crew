const { exec } = require('child_process');
const voiceFilesTest = require('./tests/testVoiceFiles');
const addPreviewsToBuild = require('./addPreviewsToBuild');

voiceFilesTest()
	.then(() => {
		return new Promise((res, rej) => {
			const buildEnv = process.argv[2];
			if (!validateBuildEnv(buildEnv)) return console.error('Invalid build ENV:', buildEnv);
			const buildCommand = buildEnv === 'local' ? 'expo build:web' : 'npm i expo-cli && expo build:web';
			console.log('Running command:', buildCommand);
			exec(buildCommand, (error, stdout, stderr) => {
				if (error) console.error(error);
				if (stderr) console.error(stderr);
				if (stdout) console.log(stdout);

				return res();
			});
		});
	})
	.then(addPreviewsToBuild)
	.catch(console.error);

function validateBuildEnv(buildEnv) {
	const validBuildEnvs = ['local', 'netlify'];
	return validBuildEnvs.includes(buildEnv);
}
