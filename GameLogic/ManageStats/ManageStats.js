import Player from './Player';
import Characters from './Characters';
import GetStats from './GetStats';
import SetStats from './SetStats';
import Environment from './Environment';
import gameReport from './GameReport';
import characters from '../PresetsAndTemplates/testCharacters';

var ManageStats = {
	//These are three object that represent where data will come from the server
	characters: null,
	shiftCharacters: null,
	characterSchedule: null,
	player: null,
	people: null,
	environment: null,

	//Misc stats. Turn into object when this area build up
	scenarioPresent: false,
	inForground: true,
	currentDay: 'monday',
	gameDriver: null,
	alreadyWon: false,

	//Event Listener arrays
	extraSetDataWork: [],
	extraDayChangeWork: [],

	//Set data from save source
	awake: (data, gmeDvr) => {
		console.log('test player', data.testPlayer);

		//This code here is test code to test story logic
		GetStats.call(ManageStats);
		SetStats.call(ManageStats);
		ManageStats.gameDriver = gmeDvr;

		//Initing player
		ManageStats.player = new Player();
		ManageStats.initilizePlayer(data);

		ManageStats.characters = [];
		ManageStats.extraDayChangeWork = [];

		data.testCharacters.forEach(characterInfo => {
			//For testing
			var character = new Characters();
			character.characterInit(characterInfo.person, characterInfo.character);
			ManageStats.characters.push(character);
		});

		ManageStats.characterSchedule = ManageStats.createScheduleWithShiftStructure(data.shiftStructure);

		ManageStats.scenarioPresent = false;
	},

	//Plays on start of game loop
	init: settings => {
		//Initing player
		ManageStats.setPStation('frier');
		ManageStats.setPEffectivness(1);
		ManageStats.setPSkillPoints(1);
		ManageStats.setPEnergy(10);

		//Initing shift characters
		ManageStats.shiftCharacters = [];
		console.log('ManageStats.characterSchedule in question');
		ManageStats.shiftCharacters = ManageStats.characterSchedule[settings.dayName][settings.difficulty.lighting];

		//reseting data that should reset each shift
		ManageStats.shiftCharacters.forEach(character => {
			ManageStats.setShiftReset(character);
		});

		ManageStats.refreshShiftCharacterStation();

		ManageStats.environment = new Environment();

		ManageStats.setTime(settings.difficulty.lighting === 'day' ? 1100 : 500);
		ManageStats.setLighting(settings.difficulty.lighting);
		ManageStats.environment.busyness.init(settings.difficulty.difficulty);

		ManageStats.extraSetDataWork = [];
		ManageStats.skillPointsUsed = 0;

		//psuto private vars
		ManageStats.pSkillPointsUsed = 0;
		ManageStats.totaleffectivnessGain = 0;

		gameReport.createInitial();
	},
	gotStatsListener: () => {},
	setStatsListener: () => {
		ManageStats.extraSetDataWork.forEach(work => {
			work();
		});
	},
	dayChangeListener: () => {
		ManageStats.extraDayChangeWork.forEach(work => {
			work();
		});
	},
	onDataChange: (work, id) => {
		var dupeDetected = false;
		if (id) {
			work.id = id;
			ManageStats.extraSetDataWork.forEach(addedWork => {
				if (addedWork.id && addedWork.id === id) {
					dupeDetected = true;
				}
			});
		}

		if (!dupeDetected) {
			ManageStats.extraSetDataWork.push(work);
		}
	},
	//For the time being, use of the id is manditory to prevent momory leak
	onDayChange: (work, id) => {
		var dupeDetected = false;
		if (id) {
			work.id = id;
			ManageStats.extraDayChangeWork.forEach(addedWork => {
				if (addedWork.id && addedWork.id === id) {
					dupeDetected = true;
				}
			});
		}

		if (!dupeDetected) {
			ManageStats.extraDayChangeWork.push(work);
		}
	},
	quit: () => {
		console.log('End');
		gameReport.createFinal();
		gameReport.createCompiled();
	},

	//helper functions
	isCook: character => {
		if (character.getJob() === 'cook') {
			return true;
		}
		return false;
	},
	inShift: character => {
		if (!characters) {
			return;
		}
		characters.forEach(shiftCharacter => {
			shiftFullName = shiftCharacter.name.get();
			searchCharacterFullName = shiftCharacter.person.name.firstName + ' ' + shiftCharacter.person.name.lastName;

			if (shiftFullName === searchCharacterFullName) {
				return true;
			}
		});

		return false;
	},
	initilizePlayer: (data = {}) => {
		const player = data.testPlayer || { name: {} };
		ManageStats.setPPower(player.power); //Setting player power here
		ManageStats.setPName(player.name.firstname, player.name.lastName);
		ManageStats.setPGender(player.gender);
		ManageStats.setPEffectivness(player.effectivness);
		ManageStats.setPSkill(player.skill);
		ManageStats.setPSkillPoints(player.skillPoints);
		ManageStats.setPEnergy(player.energy);
		ManageStats.setPSanity(player.sanity);
		ManageStats.setPHappyness(player.happyness);
		ManageStats.setPCleanliness(player.cleanliness);
		ManageStats.setPRespectability(player.respectability);
		ManageStats.setPAnger(player.anger);
	},
	initilizeSavedCharacter: () => {},
};

export default ManageStats;
