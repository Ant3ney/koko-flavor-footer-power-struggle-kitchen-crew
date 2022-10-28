import characters from './characters';
import assemblySchedule from './assemblySchedule';
import getAvailableDays from './getAvailableDays';
import player from './player';

export function initializeUser() {
	return {
		testCharacters: characters,
		testPlayer: player,
		shiftStructure: assemblySchedule(characters),
		availableDays: getAvailableDays(),
		initialChapter: 0, //Default is 0
		currentDay: 'monday',
	};
}

const initializedUser = initializeUser();

export default initializedUser;
