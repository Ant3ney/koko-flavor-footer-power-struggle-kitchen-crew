import characters from './characters';
import assemblySchedule from './assemblySchedule';
import availableDays from './availableDays';
import player from './player';

function initializeUser() {
	return {
		testCharacters: characters,
		testPlayer: player,
		shiftStructure: assemblySchedule(characters),
		availableDays,
		initialChapter: 0, //Default is 0
		currentDay: 'monday',
	};
}

const initializedUser = initializeUser();

export default initializedUser;
