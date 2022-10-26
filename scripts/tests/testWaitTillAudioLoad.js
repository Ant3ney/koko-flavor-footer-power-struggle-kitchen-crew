import waitTillLoadAudio from '../../utilities/waitTillLoadAudio';

const testStatus = 'in_progress';

setTimeout(() => {
	if (testStatus !== 'successfully') {
		console.log('Test failed. Small audio file did not load within 30 seconds.');
		testStatus = 'test_failed';
	}
}, 30000);

(async () => {
	await waitTillLoadAudio('click');
	testStatus = 'successfully';
})();
