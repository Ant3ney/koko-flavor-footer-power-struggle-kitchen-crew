import music from './music';
import utils from '../../utilities';
const PLAY_MUSIC_SETTINGS = { volume: 0.15, loop: true };
type GameContext = {
	day: string;
	lighting: string;
	sanity: number;
	currentShift: any;
};

interface GameplayMusic extends Partial<GameContext> {
	start: Function;
	tic: Function;
	end: Function;
	curriedIsDay: Function;
	playing?: string | null;
}

const gameplayMusic: GameplayMusic = {
	start: (gameContext: GameContext) => {
		addFirstToSecond(gameplayMusic, gameContext);
		const takaIsHere = doseShiftHaveName('Taka Okuno');
		const kaseyIsHere = doseShiftHaveName('Kasey Takahashi');
		const vickyIsHere = doseShiftHaveName('Vicky Dang');

		if (checkIfPlayerIsInsane()) playInsanityMusic();
		else if (kaseyIsHere && vickyIsHere) music.play('cheese', PLAY_MUSIC_SETTINGS);
		else if (takaIsHere) music.play('taka', PLAY_MUSIC_SETTINGS);
		else if (kaseyIsHere || vickyIsHere) music.play('cheese', PLAY_MUSIC_SETTINGS);
		else playMusicFromTimeAndDay();
	},
	tic: (sanity: number) => {
		if (checkIfPlayerIsInsane(sanity)) playInsanityMusic();
	},
	end: () => {
		music.pause();
		gameplayMusic.playing = null;
	},
	curriedIsDay: (): boolean => {
		return isDay(gameplayMusic.lighting);
	},
};

function checkIfPlayerIsInsane(sanity?: number) {
	if (sanity && typeof sanity !== 'number') return sanity < 0;
	else if (gameplayMusic?.sanity || gameplayMusic?.sanity === 0) return gameplayMusic.sanity < 0;
	return false;
}

function playMusicFromTimeAndDay() {
	switch (gameplayMusic?.day) {
		case 'monday':
			//TODO play music called monday morning when that song is created.
			if (gameplayMusic.curriedIsDay()) music.play('eventfulShift');
			else playEasyNightMusic();
			break;
		case 'tuesday':
			if (gameplayMusic.curriedIsDay()) playNonMondayMorningMusic();
			else playEasyNightMusic();
			break;
		case 'wednesday':
			if (gameplayMusic.curriedIsDay()) playNonMondayMorningMusic();
			else playMediumNightMusic();
			break;
		case 'thursday':
			if (gameplayMusic.curriedIsDay()) playNonMondayMorningMusic();
			else playMediumNightMusic();
			break;
		case 'friday':
			if (gameplayMusic.curriedIsDay()) playNonMondayMorningMusic();
			else playHardNightMusic();
			break;
		case 'saturday':
			if (gameplayMusic.curriedIsDay()) playNonMondayMorningMusic();
			else playHardNightMusic();
			break;
		case 'sunday':
			if (gameplayMusic.curriedIsDay()) playNonMondayMorningMusic();
			else playHardNightMusic();
			break;
		default:
			//@ts-ignore
			console.error(`Invalid case detected in gameplayMusic.\n${gameplayMusic?.day} is invalid`);
	}
}

function addFirstToSecond(first: any, second: any) {
	if (!first || !second) return console.error(`${first} and / or ${second} are not properly defined.`);
	for (let prop in second) {
		first[prop] = second[prop];
	}
}

function isDay(lighting?: string): boolean {
	return lighting === 'day';
}

function playEasyNightMusic() {
	playRandomMusicFrom(easyNightMusic);
}

function playMediumNightMusic() {
	playRandomMusicFrom(mediumNightMusic);
}

function playHardNightMusic() {
	playRandomMusicFrom(hardNightMusic);
}

function playNonMondayMorningMusic() {
	playRandomMusicFrom(nonMondayMorningMusic);
}

function playRandomMusicFrom(musicArray: any) {
	const randomMusicIndex: number = utils.getRandomIndexFromArray(musicArray);
	const musicToPlay: string = musicArray[randomMusicIndex];
	gameplayMusic.playing = musicToPlay;
	music.play(musicToPlay, PLAY_MUSIC_SETTINGS);
}

function playInsanityMusic() {
	if (gameplayMusic.playing === 'insanity') return;
	if (!gameplayMusic.playing) music.play('insanity', PLAY_MUSIC_SETTINGS);
	else music.musicTransitionTo('insanity');
	gameplayMusic.playing = 'insanity';
}

function doseShiftHaveName(name: string): boolean {
	const shift = gameplayMusic?.currentShift;
	if (!shift) return false;
	for (let i = 0; i < shift.length; i++) {
		const character = shift[i];
		if (!character) return false;
		if (character.name.get() === name) return true;
	}
	return false;
}

//TODO when morning music is finished, add them in here in correct place.
//For now, all gameplay music that gets played will be eventfulShift.
const easyNightMusic = ['eventfulShift'];
const mediumNightMusic = ['eventfulShift'];
const hardNightMusic = ['eventfulShift', 'eventfulShift02'];
const nonMondayMorningMusic = ['eventfulShift'];

export default gameplayMusic;
