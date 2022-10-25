import util from '../../utilities';
import cMan from './characterManager';

var assemblySchedule = (characters: any) => {
	//characters can only be scedualed 3 times(implement in the future)
	//characters can only be scedualed once a day

	//Initilazition
	var schedule: any = {
		monday: {
			day: [],
			night: [],
		},
		tuesday: {
			day: [],
			night: [],
		},
		wednesday: {
			day: [],
			night: [],
		},
		thursday: {
			day: [],
			night: [],
		},
		friday: {
			day: [],
			night: [],
		},
		saturday: {
			day: [],
			night: [],
		},
		sunday: {
			day: [],
			night: [],
		},
	};
	characters.forEach((character: any) => {
		//This var will only be used in assemblySchedule function
		//This var wont actualy be used untill enoughf characters are put into the game to padd out the Scedual
		//In future characters should be chosen based off some factor other than a random number generator
		character.shifts = 0;
	});

	//Outermost loop
	for (var day in schedule) {
		var avalibleServers = [];
		var avalibleCooks = [];
		var randomIndex;

		//Add Servers
		for (var i = 0; i < 8; i++) {
			//Ineficient I know
			if (i < 4) {
				// The first half is day shift
				avalibleServers = cMan.getServersWhosNot(characters, schedule[day].day);
				randomIndex = util.getRandomIndexFromArray(avalibleServers);
				let addedCharacter = avalibleServers[randomIndex];
				schedule[day].day.push(addedCharacter);
			} else {
				avalibleServers = cMan.getServersWhosNot(characters, schedule[day].night);
				randomIndex = util.getRandomIndexFromArray(avalibleServers);
				let addedCharacter = avalibleServers[randomIndex];
				schedule[day].night.push(addedCharacter);
			}
		}
		//Add Cooks
		for (var i = 0; i < 4; i++) {
			if (i < 2) {
				avalibleCooks = cMan.getCooksWhosNot(characters, schedule[day].day);
				randomIndex = util.getRandomIndexFromArray(avalibleCooks);
				let addedCharacter = avalibleCooks[randomIndex];
				schedule[day].day.push(addedCharacter);
			} else {
				avalibleCooks = cMan.getCooksWhosNot(characters, schedule[day].night);
				randomIndex = util.getRandomIndexFromArray(avalibleCooks);
				let addedCharacter = avalibleCooks[randomIndex];
				schedule[day].night.push(addedCharacter);
			}
		}
	}

	return schedule;
};

export default assemblySchedule;
