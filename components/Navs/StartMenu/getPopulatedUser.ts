import { localStorage } from '../../../utilities';
import tempOfflineBackendUser from '../../tempOfflineBackend';

type User = {
	testPlayer?: any;
	testCharacters?: any;
	shiftStructure?: any;
	availableDays?: any;
	initialChapter?: any;
	currentDay?: any;
};

export default async function getPopulatedUser() {
	//Data and user mean nearly the same thing.
	let user = (await localStorage.getObject('user')) as User;
	if (!user) user = (await fetchUser()) as User;

	console.log('Found local storage user:', user);

	if (!user) console.error(`User is not populated. This is unexpected and will cause errors`);
	if (!user) user = {};

	return user;
}

async function fetchUser() {
	return tempOfflineBackendUser;
	/* 
		BackEnd Offline
		The below code is commented out because the backend server went out (Exceeded free plan quota). 
		For now we will just get the initial data from local static files 
	*/
	/* return new Promise((res, rej) => {
		fetch('https://coco-game-17308.herokuapp.com/testApi/characters')
			.then(response => response.json())
			.then(async data => {
				res(data);
			})
			.catch(console.error);
		console.log();
	}); */
}
