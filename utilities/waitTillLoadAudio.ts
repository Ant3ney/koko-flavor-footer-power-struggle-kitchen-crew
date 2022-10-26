import Sound from '../GameLogic/AudioSystem';
function waitTillLoadAudio(audio: string) {
	return new Promise(resolve => {
		new Sound(audio, {
			onLoad: () => {
				resolve(true);
			},
		});
	});
}

export default waitTillLoadAudio;
