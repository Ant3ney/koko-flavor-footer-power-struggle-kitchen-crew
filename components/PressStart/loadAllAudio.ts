import { sounds } from '../../GameLogic/AudioSystem';
import waitTillLoadAudio from '../../utilities/waitTillLoadAudio';

async function loadAllSounds(logger?: Function) {
	const context = { max: Object.keys(sounds).length, currentSound: 0 };
	for (let sound in sounds) {
		context.currentSound++;
		if (logger) logger(context);
		await waitTillLoadAudio(sound);
	}
	context.currentSound = 0;
}

export default loadAllSounds;
