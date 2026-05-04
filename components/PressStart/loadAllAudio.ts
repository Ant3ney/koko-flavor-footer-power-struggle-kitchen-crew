import { sounds } from '../../GameLogic/AudioSystem';
import waitTillLoadAudio from '../../utilities/waitTillLoadAudio';

const AUDIO_CACHE_KEY = 'flavor-fodder-audio-preload-v2';

async function loadAllSounds(logger?: Function) {
	const soundNames = Object.keys(sounds);
	const context = { max: soundNames.length, currentSound: 0, cached: false };
	if (hasAudioPreloadCache(soundNames)) {
		context.cached = true;
		if (logger) logger(context);
		return;
	}
	for (let sound of soundNames) {
		context.currentSound++;
		if (logger) logger(context);
		await waitTillLoadAudio(sound);
	}
	setAudioPreloadCache(soundNames);
	context.currentSound = 0;
}

function hasAudioPreloadCache(soundNames: string[]) {
	if (!canUseLocalStorage()) return false;
	try {
		const cached = window.localStorage.getItem(AUDIO_CACHE_KEY);
		return cached === soundNames.join('|');
	} catch (error) {
		return false;
	}
}

function setAudioPreloadCache(soundNames: string[]) {
	if (!canUseLocalStorage()) return;
	try {
		window.localStorage.setItem(AUDIO_CACHE_KEY, soundNames.join('|'));
	} catch (error) {}
}

function canUseLocalStorage() {
	return typeof window !== 'undefined' && !!window.localStorage;
}

export default loadAllSounds;
