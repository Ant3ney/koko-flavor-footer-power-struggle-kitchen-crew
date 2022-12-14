import testAudio from './test.mp3';
import testAudio2 from './test2.mp3';
import powerFest from './powerFest.mp3';
import eventfulShift from './eventfulShift.mp3';
import mainTheme from './mainTheme.mp3';
import click01 from './click01.mp3';
import triumph from './triumph.mp3';
import cheese from './cheese.mp3';
import bicker from './bicker.mp3';
import maleApeShort from './maleApeShort.mp3';
import maleApeMedium from './maleApeMedium.mp3';
import maleApeLong from './maleApeLong.mp3';
import femaleApeShort from './femaleApeShort.mp3';
import femaleApeMedium from './femaleApeMedium.mp3';
import femaleApeLong from './femaleApeLong.mp3';
import party from './party.mp3';
import taka from './taka.mp3';
import conspiracy from './conspiracy.mp3';
import hardTimes from './hardTimes.mp3';
import hirokitron from './hirokitron.mp3';
import goodNews from './goodNews.mp3';
import insanity from './insanity.mp3';
import eventfulShift02 from './eventfulShift02.mp3';
import voices from './voices';
import nostalgicMorning from './nostalgicMorning.mp3';
import mondayMorning from './mondayMorning.mp3';

//TODO import sounds as categories of objects in another files exports
//Then use spread operator to make them available as properties in sound object.

const sounds: any = {
	test: testAudio,
	test2: testAudio2,
	powerFest,
	eventfulShift,
	mainTheme,
	click01,
	triumph,
	cheese,
	bicker,
	maleApeShort,
	maleApeMedium,
	maleApeLong,
	femaleApeShort,
	femaleApeMedium,
	femaleApeLong,
	party,
	taka,
	conspiracy,
	hardTimes,
	hirokitron,
	goodNews,
	insanity,
	eventfulShift02,
	nostalgicMorning,
	mondayMorning,
	...voices,
};

export default sounds;
