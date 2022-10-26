import waitTillLoadAudio from '../../utilities/waitTillLoadAudio';

async function testWaitTillAudioLoad() {
	let testStatus = 'in_progress';

	setTimeout(() => {
		if (testStatus !== 'successfully') {
			console.log('Test failed. Audio file did not load within 30 seconds.');
			testStatus = 'test_failed';
		}
	}, 30000);

	await waitTillLoadAudio('click01');
	testStatus = 'successfully';
	console.log(testStatus);
}

export default testWaitTillAudioLoad;
