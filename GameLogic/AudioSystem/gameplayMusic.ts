import music from './music';
import utils from '../../utilities';
const PLAY_MUSIC_SETTINGS = { volume: 0.15, loop: true };
const LOG_TIC_REPORT = false;

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
		calculateAndPlayMusic();
	},
	tic: (sanity: number) => {
		gameplayMusic.sanity = sanity;
		handleTicReport(sanity);

		if (checkIfPlayerIsInsane(sanity)) handleInsanityMusic();
		else if (gameplayMusic.playing === 'insanity') calculateAndPlayMusic(sanity);
	},
	end: () => {
		music.pause();
		gameplayMusic.playing = null;
	},
	curriedIsDay: (): boolean => {
		return isDay(gameplayMusic.lighting);
	},
};

/**
 * If the player is insane, play insanity music, otherwise if Kasey and Vicky are here, play cheese
 * music, otherwise if Taka is here, play Taka music, otherwise if Kasey or Vicky is here, play cheese
 * music, otherwise play music based on the time and day.
 * @param {number} [sanity] - number - The sanity of the player.
 */
function calculateAndPlayMusic(sanity?: number) {
	const takaIsHere = doseShiftHaveName('Taka Okuno');
	const kaseyIsHere = doseShiftHaveName('Kasey Takahashi');
	const vickyIsHere = doseShiftHaveName('Vicky Dang');

	if (checkIfPlayerIsInsane(sanity)) handleInsanityMusic();
	else if (kaseyIsHere && vickyIsHere) playCheeseMusic();
	else if (takaIsHere) playTaka();
	else if (kaseyIsHere || vickyIsHere) music.play('cheese', PLAY_MUSIC_SETTINGS);
	else playMusicFromTimeAndDay();
}

function checkIfPlayerIsInsane(sanity?: number) {
	if (typeof sanity === 'number') return sanity < 0;
	else if (gameplayMusic?.sanity || gameplayMusic?.sanity === 0) return gameplayMusic.sanity < 0;
	return false;
}

function playMusicFromTimeAndDay() {
	switch (gameplayMusic?.day) {
		case 'monday':
			//TODO play music called monday morning when that song is created.
			if (gameplayMusic.curriedIsDay()) music.play('mondayMorning');
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

function playCheeseMusic() {
	if (gameplayMusic.playing === 'insanity') music.musicTransitionTo('cheese');
	else music.play('cheese', PLAY_MUSIC_SETTINGS);
	gameplayMusic.playing = 'cheese';
}

function playTaka() {
	if (gameplayMusic.playing === 'insanity') music.musicTransitionTo('taka');
	else music.play('taka', PLAY_MUSIC_SETTINGS);
	gameplayMusic.playing = 'taka';
}

function playRandomMusicFrom(musicArray: any) {
	const randomMusicIndex: number = utils.getRandomIndexFromArray(musicArray);
	const musicToPlay: string = musicArray[randomMusicIndex];
	gameplayMusic.playing = musicToPlay;
	music.play(musicToPlay, PLAY_MUSIC_SETTINGS);
}

function handleInsanityMusic() {
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

function handleTicReport(sanity: number) {
	if (LOG_TIC_REPORT)
		console.log(
			'gameplayMusic Tic report:',
			'sanity:',
			sanity,
			'checkIfPlayerIsInsane(sanity):',
			checkIfPlayerIsInsane(sanity),
			"gameplayMusic.playing === 'insanity':",
			gameplayMusic.playing === 'insanity',
			'gameplayMusic.playing:',
			gameplayMusic.playing
		);
}

//TODO when morning music is finished, add them in here in correct place.
//For now, all gameplay music that gets played will be eventfulShift.
const easyNightMusic = ['eventfulShift'];
const mediumNightMusic = ['eventfulShift'];
const hardNightMusic = ['eventfulShift', 'eventfulShift02'];
const nonMondayMorningMusic = ['nostalgicMorning'];

export default gameplayMusic;
