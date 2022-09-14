import AsyncStorage from '@react-native-async-storage/async-storage';
import mStats from '../ManageStats/ManageStats';
import { User } from './UserType';
import { localStorage } from '../../utilities';

/* Yes. saveUser will also save all other characters. This is because the stats of 
other characters are part of the users progression. */
async function saveUser() {
	//#region Getting and Formating characters
	//@ts-ignore;
	console.log('mstats.getCharacters()', mStats.getCharacters());
	//@ts-ignore;
	const characters = mStats.getCharacters();
	const formatedCharacters: any[] = [];
	for (let i: number = 0; i < characters.length; i++) {
		const character = characters[i];
		const formatedCharacter = {
			person: {
				name: {
					firstName: character.name.getFirst(),
					lastName: character.name.getLast(),
				},
				age: character.getAge(),
				gender: character.getGender(),
				wealth: character.getWealth(),
				personality: character.getPersonality(),
				deniedPhrase: character.getDeniedPhrase(),
				catchPhrase: character.getCatchPhrase(),
			},
			character: {
				power: character.getPower(),
				skill: character.getSkill(),
				skillPoints: character.getSkillPoints(),
				currentStation: character.getCurrentStation(),
				job: character.getJob(),
				effectivness: character.getEffectivness(),
				sanity: character.getSanity(),
				respectability: character.getRespectability(),
				happyness: character.getHappyness(),
				cleanliness: character.getCleanliness(),
				anger: character.getAnger(),
			},
		};
		formatedCharacters.push(formatedCharacter);
	}

	//#endregion

	//#region Saving character schedual
	//@ts-ignore
	const characterSchedual = mStats.getCharacterSchedule();
	//#endregion

	//#region Getting player data
	//@ts-ignore;
	const player = mStats.getPlayer();
	const formatedPlayer = {
		power: player.getPower(),
		name: {
			firstname: player.name.getFirst(),
		},
		gender: player.getGender(),
	};
	console.log('saving the following player', formatedPlayer);
	//#endregion

	//#region Creating and saving user obect to local storage.
	const user: User = {
		testCharacters: formatedCharacters,
		testPlayer: formatedPlayer,
		shifStructure: characterSchedual,
		availableDays: null,
		initialChapter: 0,
		currentDay: 'monday',
	};
	const userJSON = JSON.stringify(user);
	await AsyncStorage.setItem('user', userJSON);
	console.log('user before JSON and saving', user);
	//#endregion
}

export default saveUser;
