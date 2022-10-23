const { exec } = require('child_process');
const voiceFilesTest = require('./testVoiceFiles');

voiceFilesTest()
	.then(() => {
		const buildEnv = process.argv[2];
		if (!validateBuildEnv(buildEnv)) return console.error('Invalid build ENV:', buildEnv);
		const buildCommand = buildEnv === 'local' ? 'expo build:web' : 'npm i expo-cli && expo build:web';
		console.log('Running command:', buildCommand);
		exec(buildCommand, (error, stdout, stderr) => {
			if (error) return console.error(error);
			if (stderr) return console.error(stderr);
			if (stdout) return console.log(stdout);
		});
	})
	.catch(console.error);

function validateBuildEnv(buildEnv) {
	const validBuildEnvs = ['local', 'netlify'];
	return validBuildEnvs.includes(buildEnv);
}
