import { localStorage } from '../../../utilities';

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
	let user = (await fetchUser()) as User;
	let data = {
		testPlayer: null,
		testCharacters: null,
		shiftStructure: null,
		availableDays: null,
		initialChapter: null,
		currentDay: null,
	};

	try {
		user = ((await localStorage.getObject('user')) as User) || user;
	} catch {
		return;
	}

	console.log('Found local storage user:', user);

	if (!user) console.error('User is not populated. This is unexpected and will cause errors');
	if (!user) user = {};

	if (user?.testPlayer) data.testPlayer = user.testPlayer;
	if (user?.testCharacters) data.testCharacters = user.testCharacters;
	if (user?.shiftStructure) data.shiftStructure = user.shiftStructure;
	if (user?.availableDays) data.availableDays = user.availableDays;
	if (user?.initialChapter) data.initialChapter = user.initialChapter;
	if (user?.currentDay) data.currentDay = user.currentDay;

	return { user, data };
}

async function fetchUser() {
	return new Promise((res, rej) => {
		fetch('https://coco-game-17308.herokuapp.com/testApi/characters')
			.then(response => response.json())
			.then(async data => {
				res(data);
			})
			.catch(console.error);
		console.log();
	});
}
