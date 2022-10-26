import { sounds } from '../../GameLogic/AudioSystem';
import waitTillLoadAudio from '../../utilities/waitTillLoadAudio';

async function loadAllSounds() {
	for (let sound in sounds) await waitTillLoadAudio(sound);
}

export default loadAllSounds;
