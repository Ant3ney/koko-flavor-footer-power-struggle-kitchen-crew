import AsyncStorage from '@react-native-async-storage/async-storage';
import mStats from '../ManageStats/ManageStats';
import { User } from './UserType';

async function saveUser() {
	//#region Formating characters
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
		console.log('formatedCharacter', formatedCharacter);
	}
	//#endregion
	//For now, data will just be saved to local storage
	const JSONUser = await AsyncStorage.getItem('user');
	const user: User = JSONUser
		? JSON.parse(JSONUser)
		: {
				testCharacters: null,
				testPlayer: null,
				shifStructure: null,
				availableDays: null,
				initialChapter: 0,
				currentDay: 'monday',
		  };
	//@ts-ignore;
	const player = mStats.getPlayer();
	const playerBuffer = { ...player, voice: null };
	user.testPlayer = playerBuffer;
	const userJSON = JSON.stringify(user);
	await AsyncStorage.setItem('user', userJSON);
	const JSONUserTest = await AsyncStorage.getItem('user');
	console.log('JSONUserTest: ', JSONUserTest);
}

export default saveUser;
