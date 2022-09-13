import AsyncStorage from '@react-native-async-storage/async-storage';
import mStats from '../ManageStats/ManageStats';
import { User } from './UserType';

async function saveUser() {
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
