import music from './music';
import utils from '../../utilities';

type GameContext = {
	day: string;
	lighting: string;
	sanity: number;
};

const gameplayMusic = {
	start: (gameContext: GameContext) => {
		//TODO check if vicky or Kasey are in current shift via gameContext and play cheese if player is not to insane
		//TODO check if Taka are in current shift via gameContext and play taka if player is not to insane
		//Taka will take president over Kasey or Vicky but not over the two of them.
		//High insanity takes president over all.
		switch (gameContext?.day) {
			case 'monday':
				//TODO play music called monday morning when that song is created.
				if (curriedIsDay()) music.play('eventfulShift');
				else playEasyNightMusic();
				break;
			case 'tuesday':
				if (curriedIsDay()) playNonMondayMorningMusic();
				else playEasyNightMusic();
				break;
			case 'wednesday':
				if (curriedIsDay()) playNonMondayMorningMusic();
				else playMediumNightMusic();
				break;
			case 'thursday':
				if (curriedIsDay()) playNonMondayMorningMusic();
				else playMediumNightMusic();
				break;
			case 'friday':
				if (curriedIsDay()) playNonMondayMorningMusic();
				else playHardNightMusic();
				break;
			case 'saturday':
				if (curriedIsDay()) playNonMondayMorningMusic();
				else playHardNightMusic();
				break;
			case 'sunday':
				if (curriedIsDay()) playNonMondayMorningMusic();
				else playHardNightMusic();
				break;
			default:
				console.error(`Invalid case detected in gameplayMusic.\n${gameContext?.day} is invalid`);
		}

		function curriedIsDay(): boolean {
			return isDay(gameContext.lighting);
		}
	},
};

function isDay(lighting: string): boolean {
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
	music.play(musicToPlay);
}

//TODO when morning music is finished, add them in here in correct place.
//For now, all gameplay music that gets played will be eventfulShift.
const easyNightMusic = ['eventfulShift'];
const mediumNightMusic = ['eventfulShift'];
const hardNightMusic = ['eventfulShift', 'eventfulShift02'];
const nonMondayMorningMusic = ['eventfulShift'];

export default gameplayMusic;
