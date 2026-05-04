import mStats from '../ManageStats/ManageStats';
import StaticScenario from '../Scenario/StaticScenario';
import { click } from '../AudioSystem';

const difficulty = 'dyslexic';
export const STATIONS = {
	SAUCE: 'sause',
	FRYER: 'frier',
	RICE: 'rice',
};
export const ALL_STATIONS = [STATIONS.SAUCE, STATIONS.FRYER, STATIONS.RICE];
export const PLACEHOLDER_SCENARIO_IMAGE = require('../../assets/scenarios/scenarios_placeholder.png');
export const PLACEHOLDER_SCENARIO_SOUND = 'scenarioStinger';

export function normalizeStation(station) {
	if (station === 'sauce') {
		return STATIONS.SAUCE;
	}
	if (station === 'fryer') {
		return STATIONS.FRYER;
	}
	return station;
}

export function getScenarioStations(templateOrScenario) {
	if (!templateOrScenario || !templateOrScenario.stations) {
		return ALL_STATIONS;
	}
	return templateOrScenario.stations.map(normalizeStation);
}

export function isScenarioAvailableForStation(templateOrScenario, station) {
	return getScenarioStations(templateOrScenario).indexOf(normalizeStation(station)) >= 0;
}

export function getAvailableScenarioTemplates(station) {
	return scenariosTempletes.filter(template => isScenarioAvailableForStation(template, station));
}

export function hasScenarioForStation(station) {
	return getAvailableScenarioTemplates(station).length > 0;
}

function addScenarioDefaults(scenario) {
	return {
		...scenario,
		stations: getScenarioStations(scenario),
		involvedCharacters: scenario.involvedCharacters || [],
		image: scenario.image || PLACEHOLDER_SCENARIO_IMAGE,
		soundEffect: scenario.soundEffect || PLACEHOLDER_SCENARIO_SOUND,
	};
}

function managerCharacter(name, avatar) {
	return {
		name,
		role: 'Manager',
		avatar: avatar || 'John_The_Manager',
	};
}

function getUniqueCharacters(characters) {
	var seen = {};
	return characters.filter(character => {
		var key = getCharacterName(character);
		if (!key || seen[key]) {
			return false;
		}
		seen[key] = true;
		return true;
	});
}

function getCharacterName(character) {
	if (!character) {
		return null;
	}
	if (character.name && character.name.get) {
		return character.name.get();
	}
	return character.name || null;
}

export function getMaxTimeMultiplyer() {
	let multiplyer = 1;
	switch (difficulty) {
		case 'dyslexic':
			multiplyer = 4;
			break;

		case 'typicallexic':
			multiplyer = 2;
			break;
		case 'eulexic':
			break;
		default:
			console.error(`Canot assign a difficult multiplyer of difficult ${difficulty}`);
			break;
	}

	return multiplyer;
}

var scenariosTempletes = [
	() => {
		var subjectObj = mStats.getRandomServer(true);
		var subject = subjectObj.name.getFirst();
		var playerRespect = mStats.getPRespectability();

		return addScenarioDefaults({
			stations: [STATIONS.SAUCE],
			involvedCharacters: [subjectObj],
			prompt:
				'You pour cury into four boals starting from right to left. You pour a large regular with vegtables, a medium lv4, a medium lv2 with mushrooms, and a small lv2. ' +
				subject +
				' points to the third cury and asks. "Is this lv2 mushroom with corn". How do you reply',
			buttons: [
				{
					title: 'Yes it is.',
					onPress: () => {
						click();
						StaticScenario.prompt =
							subject +
							' brings the food to pantry and before ' +
							mStats.getGenderPronounOfCharacter(subjectObj) +
							' finishes packing ' +
							mStats.getGenderPronounOfCharacter(subjectObj) +
							' sees that the order is not  a lv2 mushroom with corn.\n-20Power\n-10Station ectivness';
						//aply consiquence
						mStats.subtractPEffectivness(10);
						mStats.subtractPPower(20 - playerRespect);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'No it Isn’t', //its in order / sure / Naww / Shrooms? Yee
					onPress: () => {
						click();
						StaticScenario.prompt =
							'The shift carys on as normal for you are correct\n+20Power\n+10Station effectivness';
						//aply consiquence
						mStats.addPEffectivness(10);
						mStats.addPPower(20 + playerRespect);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 20,
			onTimeout: () => {
				StaticScenario.prompt =
					subject +
					' decides to handle the situation on ' +
					mStats.getGenderPossessiveCharacter(subjectObj) +
					' own\n-40 Power\n-20Station effectivness';

				//aply consiquence
				mStats.subtractPEffectivness(20);
				mStats.subtractPPower(40 - playerRespect);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		var subjectObj01 = mStats.getRandomCook(true);
		var subjectObj02 = mStats.getRandomCookWhosNot(subjectObj01.name.get(), true);
		var subject01 = subjectObj01.name.getFirst();
		var subject02 = subjectObj02.name.getFirst();
		return addScenarioDefaults({
			stations: [STATIONS.RICE],
			involvedCharacters: getUniqueCharacters([...mStats.getShiftCharacters(), managerCharacter('Carlose')]),
			prompt:
				'You are out of rice! The rush has been going on for hours and the crew has barly been able to keep up. When ' +
				subject01 +
				' goes to pick up rice, he notices there is no more! How to you respond to this?',
			buttons: [
				{
					title: 'Yell at and blame ' + subject01,
					onPress: () => {
						click();
						StaticScenario.prompt =
							subject01 +
							'and the crew around you with stare with a blank look that quikly turns into discontent. ' +
							subject01 +
							' rushes over and makes a new batch of rice\n-20 All cooks Sanity\n-20 All cooks station Effectivness';
						//aply consiquence
						mStats.addCSanity(subjectObj01, -20);
						mStats.addCSanity(subjectObj02, -20);
						mStats.addCEffectivness(subjectObj01, -20);
						mStats.addCEffectivness(subjectObj02, -20);
						mStats.addPSanity(-20);
						mStats.addPEffectivness(-20);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Blame ' + subject02,
					onPress: () => {
						click();
						StaticScenario.prompt =
							subject02 +
							' is visibly upseat. Right before ' +
							subject02 +
							' Respons ' +
							subject01 +
							' anounces to the crew, "I actualy forgot to make more rice, my bad. I\'ll quickly make more." every one is a little shook from the sudden rice shortage.\n-20 Power\n-10 Overall Sanity\n-30 ' +
							subject02 +
							"'s sanity";
						//aply consiquence
						var playerRespect = mStats.getPRespectability();
						mStats.subtractPPower(20 - playerRespect);
						mStats.addPSanity(-10);
						mStats.addCSanity(subjectObj02, -30);
						mStats.addCSanity(subjectObj01, -10);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Take full responsiblity',
					onPress: () => {
						click();
						StaticScenario.prompt =
							subject01 +
							'tells you its his fault and that he should have been more carefull. The kitchen crew then sees you as a responsible leader\n-20 Station Effectivness\n+10 Respectability\n+10 Power';
						//aply consiquence
						mStats.addPRespectability(10);
						var playerRespect = mStats.getPRespectability();
						mStats.addPEffectivness(-20);
						mStats.addPPower(10 + playerRespect);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Get a manager',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'Carlose the manager comes in sees the empty rice warmers and is visable shook. He stops all new orders and looks at the kitchen crew with a vngefull look, He tells each kitchen employee, "Can I talk to you outside please".\n-100 Over all shift power';
						//aply consiquence
						var playerRespect = mStats.getPRespectability();
						mStats.getShiftCharacters().forEach(character => {
							var characterRespectiblity = mStats.getCRespectability(character);
							mStats.addCPower(character, -100 + characterRespectiblity);
						});
						mStats.subtractPPower(100 - playerRespect);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					'The crew continue on bu see you as less compident then before\n-50 Power\n-10 Station effectivness';

				//aply consiquence
				var playerRespect = mStats.getPRespectability();
				mStats.subtractPPower(50 - playerRespect);
				mStats.addPEffectivness(-10);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		var subjectObj = mStats.getRandomCook(true);
		var subject = subjectObj.name.getFirst();
		return addScenarioDefaults({
			stations: ALL_STATIONS,
			involvedCharacters: [subjectObj, managerCharacter('Carlose')],
			prompt:
				'Its slow and ' +
				subject +
				' tells the whole crew that they can take a 20 minute brake instead of 10 minute break. What do you do',
			buttons: [
				{
					title: 'Take a 20 minute break',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'You enjoy a superb and refreshing 20 minute break. When you come back Carlose the manager is waiting for you. He lectures you about work edicate and with a disapointed tone of voice.\nEnergy Refilled\n-20 Power';
						//aply consiquence
						var playerRespect = mStats.getPRespectability();
						mStats.subtractPPower(20 - playerRespect);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Pass the opertunity',
					onPress: () => {
						click();
						StaticScenario.prompt = subject + ' calls you a pleb';
						//aply consiquence
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					'You waste time just standing there and ' +
					subject +
					' calls you a pleb\n -10 Station effectivness';

				//aply consiquence
				mStats.addPEffectivness(-10);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		var subjectObj = mStats.getRandomServer(true);
		var subjectObj02 = mStats.getRandomeCharacterWhosNot([subjectObj], true);
		var subject = subjectObj.name.getFirst();
		var subPro = mStats.getGenderPronounOfCharacter(subjectObj);
		return addScenarioDefaults({
			stations: [STATIONS.SAUCE, STATIONS.FRYER],
			involvedCharacters: getUniqueCharacters([subjectObj, subjectObj02, ...mStats.getShiftCharacters()]),
			prompt:
				subject +
				' comes in and hands you a long receipt and ' +
				subPro +
				' says "This order didn\'t go through. We need this ASAP"',
			buttons: [
				{
					title: 'You make the order',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'Time has passed and the order is finaly made.\n+50 Power\n-5 Station Efectivness';
						//aply consiquence
						var playerRespect = mStats.getPRespectability();
						mStats.addPPower(50 + playerRespect);
						mStats.addPEffectivness(-5);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'You say no',
					onPress: () => {
						click();
						StaticScenario.prompt =
							subject +
							' is puzzeld by your response and ' +
							subPro +
							' trys to prove the importance of the order to you meanwhile the orders stack up and the resurant slows down\n-20 Station Effectiveness\n-20 ' +
							subject +
							"'s  sanity";

						//aply consiquence
						mStats.addPEffectivness(-20);
						mStats.addCSanity(subjectObj, -30);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'You say, "Im done with your ASAP orders ' + subject + '!"',
					onPress: () => {
						click();
						StaticScenario.prompt =
							subject +
							"'s demeaner gets less friendly, " +
							subPro +
							' trys to prove the importance of the order to you meanwhile the orders stack up and the resurant slows down. ' +
							subject +
							' effects the rest of the shift\n-10 Everyones station effectivness\n-30 ' +
							subject +
							"'s sanity";

						//aply consiquence
						mStats.getShiftCharacters().forEach(character => {
							mStats.addCEffectivness(character, -10);
						});
						mStats.addCSanity(subjectObj, -30);
						mStats.subtractPEffectivness(10);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					'The orders stack up even more the resturant slows down\n-40 Power\n-10 Everyones station effectivness';

				//aply consiquence
				mStats.getShiftCharacters().forEach(character => {
					mStats.addCEffectivness(character, -10);
				});
				var playerRespect = mStats.getPRespectability();
				mStats.subtractPPower(50 - playerRespect);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		return addScenarioDefaults({
			stations: [STATIONS.FRYER],
			involvedCharacters: [],
			prompt: 'You are in the middle of a rush. You pull an order of squid out of the frier. You pour it too fast and one ring rools on the ground!',
			buttons: [
				{
					title: 'You pick it up off the ground and used it',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'You used the squid from the floor and quickly continue making orders\n+15 station effectivness\n-50 cleanliness';

						//aply consiquence
						mStats.addPEffectivness(15);
						mStats.addPCleanliness(-50);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Fry a new batch',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'You use a fresh batch of squid and wait for that to fry\n+5 cleanliness\n-20 station effectivness';

						//aply consiquence
						mStats.addPEffectivness(-20);
						mStats.addPCleanliness(5);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt = 'You waste time not makeing any decition\n-20 Station effectivness';

				//aply consiquence
				mStats.addPEffectivness(-20);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		var subjectObj = mStats.getRandomCharacter(true);
		var subject = subjectObj.name.getFirst();
		return addScenarioDefaults({
			stations: ALL_STATIONS,
			involvedCharacters: [subjectObj],
			prompt: 'A Karen walks into the kitchen and begins yelling at you because of some issue. She asks for your name and to speak to the manager.',
			buttons: [
				{
					title: 'Give her your real name and the managers phone number',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'The unruly Karen walks and tries to get you in trouble with the manager with no effect although you are shooken up from the unconfertable event\n-2 Sanity\n+2 Anger';

						//aply consiquence
						mStats.addPSanity(-2);
						mStats.addPAnger(2);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Say your name is Alex Jin',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'The unruly Karen walks and tries to get Alex Gin in trouble with the manager with no effect. You feel good about giving the Karen the runaround\n+10 Sanity';

						//aply consiquence
						mStats.addPSanity(10);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					'The grows bord of bothering you and runs off to bother ' +
					subject +
					'\n-10 ' +
					subject +
					"'s sanity";

				//aply consiquence
				mStats.addCSanity(subjectObj, -10);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		var subject01Obj = mStats.getRandomServer(true);
		var subject02Obj = mStats.getRandomCook(true);
		var subjects01sRespectability = mStats.getCRespectability(subject01Obj);
		var subjects02sRespectability = mStats.getCRespectability(subject02Obj);
		var playerRespectability = mStats.getPRespectability();
		var subject01 = subject01Obj.name.getFirst();
		var subject02 = subject02Obj.name.getFirst();
		return addScenarioDefaults({
			stations: [STATIONS.SAUCE],
			involvedCharacters: [subject01Obj, subject02Obj, managerCharacter('Carlose')],
			prompt: subject01 + ' tells you they want an extra chees topping when thats clearly against company policy',
			buttons: [
				{
					title: 'Make ' + subject01 + "'s order",
					onPress: () => {
						click();
						StaticScenario.prompt =
							'You make there order and on ' +
							subject01 +
							"'s way out carlose notices " +
							subject01 +
							' has multiple toppings on his food. Carlose lectures you ' +
							subject01 +
							'\n-50 ' +
							subject01 +
							"'s power\n-10 power";

						//aply consiquence
						mStats.addCPower(subject01Obj, -50 + subjects01sRespectability);
						mStats.subtractPPower(10 - playerRespectability);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Deny there order',
					onPress: () => {
						click();
						StaticScenario.prompt = subject01 + ' is upseat but is understanding\n+10 respectablity';

						//aply consiquence
						mStats.addPRespectability(10);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Report order to manager',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'Carlose the manager gives ' + subject01 + ' a slap on the wrist and continues on';

						//aply consiquence
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Make ' + subject02 + ' make the order',
					onPress: () => {
						click();
						StaticScenario.prompt =
							subject02 +
							' makes the order without question and while ' +
							subject01 +
							' is on his way out carlose notices ' +
							mStats.getGenderPronounOfCharacter(subject01Obj) +
							' has multiple toppings on his food. Carlose lectures ' +
							subject02 +
							' and ' +
							subject01 +
							'\n-50 ' +
							subject01 +
							"'s power\n-10 " +
							subject02 +
							"'s power";

						//aply consiquence
						mStats.addCPower(subject01Obj, -50 + subjects01sRespectability);
						mStats.addCPower(subject02Obj, -10 + subjects02sRespectability);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					subject01 +
					'looks confused and is upseat with your lack of response\n+10 ' +
					subject01 +
					"'s anger";

				//aply consiquence
				mStats.addCAnger(subject01Obj, 10);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		var subjectObj = mStats.getRandomCharacter(true);
		var subject = subjectObj.name.getFirst();
		return addScenarioDefaults({
			stations: ALL_STATIONS,
			involvedCharacters: [subjectObj],
			prompt: subject + ' invites you to go on a hike in the dark next week',
			buttons: [
				{
					title: 'Say your family is expecting you at home',
					onPress: () => {
						click();
						StaticScenario.prompt = subject + ' looks disapointed but is understanding';

						//aply consiquence
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'You go on the hike',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'A few days later you go on that hike. When you get there a few of ' +
							subject +
							' goons jump you from near a blind corner, they take your money and leave you there half dead.\n-50 Sanity\n-50 ' +
							subject +
							' respectibility';

						//aply consiquence
						mStats.addPSanity(-50);
						mStats.addCRespectability(subjectObj, -50);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					subject + ' slowly backs off into the distance and dosent bring this topic up again';

				//aply consiquence
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		var playerRespectability = mStats.getPRespectability();
		return addScenarioDefaults({
			stations: ALL_STATIONS,
			involvedCharacters: [managerCharacter('Carlose')],
			prompt: 'Carlose the manager sees your face and asks you to shave',
			buttons: [
				{
					title: 'Say "Ok, I\'ll shave by next shift"',
					onPress: () => {
						click();
						StaticScenario.prompt =
							"Carlose is happey you obayed him without question and continues on\n+20 power\n+20 Carlose's sanity";

						//aply consiquence
						mStats.addPPower(20 + playerRespectability);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Say "STFU! Don\'t tell me what to do"',
					onPress: () => {
						click();
						StaticScenario.prompt =
							"Carlose's face gets red and his breathing becomes more ireagular. He tells you in a threatening voice that he expects you to be shaved next time he see's you\n-20 power\n-20 Carlos's sanity";

						//aply consiquence
						mStats.subtractPPower(20 - playerRespectability);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					"Carlose's face gets red and his breathing becomes more ireagular. He dose not like being ignored and tells you in a threatening voice that he expects you to be shaved next time he see's you\n-20 power\n-20 Carlos's sanity";

				//aply consiquence
				mStats.subtractPPower(20 - playerRespectability);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		//In future make sure this senario is not called if player is on frier
		var subjectObj = mStats.getCookFromStation('frier');
		if (!subjectObj) {
			subjectObj = mStats.getRandomCook();
		}
		var subject = subjectObj.name.getFirst();
		return addScenarioDefaults({
			stations: [STATIONS.RICE],
			involvedCharacters: [subjectObj],
			prompt:
				'You are suplying rice that is shaped in a uniform way around the plate for an ' +
				subject +
				'. Your low on rice and should make more but leaving your station will cause a slowdown in the orders',
			buttons: [
				{
					title: 'Leave station and make rice now',
					onPress: () => {
						click();
						StaticScenario.prompt =
							subject +
							' sturgles to keep up for a while but is understanding of your decition\n+10 Respectability\n+10 Skill points\n-5 Station effectivness';

						//aply consiquence
						mStats.addPRespectability(10);
						mStats.addPSkillPoints(10);
						mStats.addPEffectivness(-10);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Stay at station and make rice later',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'You are able to keep the orders flowing smoothly and make more rice when there is a dip in the busyness\n+20 Station effectivness';

						//aply consiquence
						mStats.addPEffectivness(20);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					'You stand there and contimplate, you neither make more rice or continue working.\n-10 Power\n-20 Station effectivness';

				//aply consiquence
				var playerRespectability = mStats.getPRespectability();
				mStats.subtractPPower(10 - playerRespectability);
				mStats.subtractPEffectivness(20);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		var subjectObj = mStats.getRandomCook(true);
		var subject = subjectObj.name.getFirst();
		return addScenarioDefaults({
			stations: ALL_STATIONS,
			involvedCharacters: [subjectObj],
			prompt:
				subject +
				' asks you to grab more chicken cutlets from the fridge. Your own station is already backed up, and leaving now will slow your section down.',
			buttons: [
				{
					title: 'Get the cutlets',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'You get the cutlets, but your orders pile up and your station turns into a mess. The shift still appreciates that you helped, and ' +
							subject +
							' looks much stronger because of it.\n-30 station effectiveness\n+150 ' +
							subject +
							"'s power\n+250 power";

						mStats.addPEffectivness(-30);
						mStats.addCPower(subjectObj, 150);
						mStats.addPPower(250);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Deny the cutlets',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'You stay locked in and keep your own orders moving. Your station stays clean, but ' +
							subject +
							"'s station falls apart and the shift trusts " +
							subject +
							' less than before.\n+20 station effectiveness\n-100 ' +
							subject +
							"'s power";

						mStats.addPEffectivness(20);
						mStats.addCPower(subjectObj, -100);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					'The crew is shocked that you just stand there while the kitchen needs an answer. For the rest of the shift, the manager lectures you and the crew mocks you.\n-300 power';

				mStats.subtractPPower(300);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		return addScenarioDefaults({
			stations: [STATIONS.FRYER],
			involvedCharacters: getUniqueCharacters(mStats.getShiftCharacters()),
			prompt:
				'It is the middle of the rush, and you have lost track of how many orders need to go into the fryer.',
			buttons: [
				{
					title: 'Throw in an overwhelming amount of everything',
					onPress: () => {
						click();
						if (Math.random() < 0.5) {
							StaticScenario.prompt =
								'The rush keeps raging, and almost everything extra you dropped gets used with only a tiny amount left over. Your instincts look spot on, and the crew respects how steady you stayed. You use the leftovers for a much needed break meal.\n+20 station effectiveness\n+350 power\n+10 sanity\n+10 energy';

							mStats.addPEffectivness(20);
							mStats.addPPower(350);
							mStats.addPSanity(10);
							mStats.setPEnergy(mStats.getPEnergy() + 10);
						} else {
							StaticScenario.prompt =
								'The rush dies right after you drop the food. Now there is a mountain of wasted food getting cold, and the crew starts questioning your sense for the job.\n-20 station effectiveness\n-50 power\n-10 sanity';

							mStats.addPEffectivness(-20);
							mStats.subtractPPower(50);
							mStats.addPSanity(-10);
						}
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Drop only a few extra items',
					onPress: () => {
						click();
						if (Math.random() < 0.5) {
							StaticScenario.prompt =
								'The rush keeps going, and the few extra items are not enough to keep orders moving fast. Still, the crew respects that you stayed stable when everyone got caught off guard.\n-10 station effectiveness';

							mStats.addPEffectivness(-10);
						} else {
							StaticScenario.prompt =
								'The rush ends shortly after, and you dropped just enough food to get through it cleanly. The crew notices, but it was a small rush, so they are only mildly impressed.\n+5 station effectiveness\n+20 power';

							mStats.addPEffectivness(5);
							mStats.addPPower(20);
						}
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					'The rush keeps raging and you have nowhere near enough food cooking. Customers wait more than thirty minutes, and the whole crew is furious. They will remember this.\n-30 station effectiveness\n-100 power\n-15 sanity';

				mStats.addPEffectivness(-30);
				mStats.subtractPPower(100);
				mStats.addPSanity(-15);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		var subjectObj = mStats.getRandomServer(true);
		var subject = subjectObj.name.getFirst();
		var possessive = mStats.getGenderPossessiveCharacter(subjectObj);
		return addScenarioDefaults({
			stations: [STATIONS.SAUCE],
			involvedCharacters: [subjectObj],
			prompt:
				subject +
				' asks if the Kima sauce you just poured has meatballs in it. You know this sauce does have meatballs.',
			buttons: [
				{
					title: 'Tell the truth',
					onPress: () => {
						click();
						StaticScenario.prompt =
							subject +
							' corrects the order and keeps doing good work on ' +
							possessive +
							' station.\n+20 ' +
							subject +
							"'s power";

						mStats.addCPower(subjectObj, 20);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Say it has no meatballs',
					onPress: () => {
						click();
						StaticScenario.prompt =
							subject +
							' brings a plate of Kima curry without meatballs to a customer who did not order it that way. The customer lashes out at ' +
							subject +
							', then ' +
							subject +
							' lashes out at you for the mistake. The crew judges both of you.\n-350 ' +
							subject +
							"'s power\n-100 power";

						mStats.addCPower(subjectObj, -350);
						mStats.subtractPPower(100);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					subject +
					' has to guess without your answer. The uncertainty slows the order and makes both of you look unreliable.\n-40 ' +
					subject +
					"'s power\n-40 power";

				mStats.addCPower(subjectObj, -40);
				mStats.subtractPPower(40);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		var subjectObj = mStats.getRandomServer(true);
		var subject = subjectObj.name.getFirst();
		return addScenarioDefaults({
			stations: [STATIONS.SAUCE, STATIONS.RICE],
			involvedCharacters: getUniqueCharacters([subjectObj, ...mStats.getShiftCharacters()]),
			prompt:
				'You notice that ' +
				subject +
				' is doing dishes today. If you burn your pots, it will slow down the dish pit and make the whole kitchen harder to run.',
			buttons: [
				{
					title: 'Burn your pots',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'The dishes back up badly. Dirty dishes fill the dish area and spill onto vital counter space. Key kitchen tools stop cycling back in time, orders slow down, and the whole shift gets furious. They blame you for burning the pots, but most of the heat lands on ' +
							subject +
							' for falling behind.\n-30 power\n-300 ' +
							subject +
							"'s power";

						mStats.subtractPPower(30);
						mStats.addCPower(subjectObj, -300);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Take good care of your pots',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'Orders keep flowing smoothly, and ' +
							subject +
							' is able to wash fast enough to keep the kitchen supplied.\n+10 power for the whole shift';

						mStats.getShiftCharacters().forEach(character => {
							mStats.addCPower(character, 10);
						});
						mStats.addPPower(10);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					'You hesitate and the pots get worse while dishes keep piling up. The shift reads it as careless indecision.\n-20 power\n-80 ' +
					subject +
					"'s power";

				mStats.subtractPPower(20);
				mStats.addCPower(subjectObj, -80);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		var subjectObj = mStats.getRandomCook(true);
		var subject = subjectObj.name.getFirst();
		return addScenarioDefaults({
			stations: ALL_STATIONS,
			involvedCharacters: [subjectObj],
			prompt:
				subject +
				' asks you to run to the walk-in for another case of shrimp. Your station is packed with open orders, and leaving now will put you behind.',
			buttons: [
				{
					title: 'Get the shrimp',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'You grab the shrimp, but your section gets buried while you are gone. The shift appreciates the help, and ' +
							subject +
							' looks prepared because of you.\n-25 station effectiveness\n+120 ' +
							subject +
							"'s power\n+180 power";

						mStats.addPEffectivness(-25);
						mStats.addCPower(subjectObj, 120);
						mStats.addPPower(180);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Stay on your orders',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'You protect your station and keep the orders moving, but ' +
							subject +
							' runs out of shrimp and starts falling apart. The crew trusts ' +
							subject +
							' less after watching it happen.\n+15 station effectiveness\n-90 ' +
							subject +
							"'s power";

						mStats.addPEffectivness(15);
						mStats.addCPower(subjectObj, -90);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					'You freeze while the station and the shrimp problem both get worse. The crew reads it as panic under pressure.\n-180 power\n-15 station effectiveness';

				mStats.subtractPPower(180);
				mStats.addPEffectivness(-15);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		var subjectObj = mStats.getRandomCook(true);
		var subject = subjectObj.name.getFirst();
		return addScenarioDefaults({
			stations: [STATIONS.SAUCE, STATIONS.RICE],
			involvedCharacters: [subjectObj],
			prompt:
				subject +
				' asks you to refill the backup curry containers before the next wave of orders. You can do it, but your current plates will slow down.',
			buttons: [
				{
					title: 'Refill the backups',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'You refill the backups and save the kitchen from a bigger problem later, but your current orders get ugly. ' +
							subject +
							' and the shift notice that you covered the gap.\n-20 station effectiveness\n+100 ' +
							subject +
							"'s power\n+120 power";

						mStats.addPEffectivness(-20);
						mStats.addCPower(subjectObj, 100);
						mStats.addPPower(120);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Tell ' + subject + ' to handle it',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'You keep your own plates clean, but the backup curry runs low and ' +
							subject +
							' gets blamed for not staying ahead of it.\n+10 station effectiveness\n-80 ' +
							subject +
							"'s power";

						mStats.addPEffectivness(10);
						mStats.addCPower(subjectObj, -80);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					'Nobody refills the backups in time. The kitchen hits the next wave unprepared and everyone looks at you like you missed an easy call.\n-120 power\n-20 station effectiveness';

				mStats.subtractPPower(120);
				mStats.addPEffectivness(-20);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		return addScenarioDefaults({
			stations: [STATIONS.FRYER],
			involvedCharacters: getUniqueCharacters(mStats.getShiftCharacters()),
			prompt:
				'The fryer screen is full of chicken orders, but you are not sure if this is the peak of the rush or the last wave.',
			buttons: [
				{
					title: 'Drop a huge batch of chicken',
					onPress: () => {
						click();
						if (Math.random() < 0.5) {
							StaticScenario.prompt =
								'The rush keeps climbing. The huge batch saves the kitchen, and the crew sees you read the pressure perfectly.\n+25 station effectiveness\n+300 power\n+8 sanity';

							mStats.addPEffectivness(25);
							mStats.addPPower(300);
							mStats.addPSanity(8);
						} else {
							StaticScenario.prompt =
								'The rush drops off right after the chicken goes in. You are left with too much food getting cold, and the crew doubts your instincts.\n-25 station effectiveness\n-80 power\n-8 sanity';

							mStats.addPEffectivness(-25);
							mStats.subtractPPower(80);
							mStats.addPSanity(-8);
						}
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Drop a careful batch',
					onPress: () => {
						click();
						if (Math.random() < 0.5) {
							StaticScenario.prompt =
								'The rush keeps climbing and the careful batch is not enough. You stay composed, but the orders slow down.\n-15 station effectiveness\n+10 power';

							mStats.addPEffectivness(-15);
							mStats.addPPower(10);
						} else {
							StaticScenario.prompt =
								'The rush fades and your careful batch is exactly enough. The fryer stays clean and nobody has to throw away food.\n+10 station effectiveness\n+35 power';

							mStats.addPEffectivness(10);
							mStats.addPPower(35);
						}
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					'You do not drop enough chicken in time. The line drags, tickets turn red, and the crew gets heated at you.\n-25 station effectiveness\n-90 power\n-10 sanity';

				mStats.addPEffectivness(-25);
				mStats.subtractPPower(90);
				mStats.addPSanity(-10);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		return addScenarioDefaults({
			stations: [STATIONS.FRYER],
			involvedCharacters: getUniqueCharacters(mStats.getShiftCharacters()),
			prompt:
				'The tempura orders are coming in faster than you can count. You need to decide how much to drop before the next wave hits.',
			buttons: [
				{
					title: 'Drop everything you can fit',
					onPress: () => {
						click();
						if (Math.random() < 0.5) {
							StaticScenario.prompt =
								'The wave keeps going and almost every piece gets used. The crew sees you hold the fryer down like you expected it.\n+20 station effectiveness\n+260 power\n+5 energy';

							mStats.addPEffectivness(20);
							mStats.addPPower(260);
							mStats.setPEnergy(mStats.getPEnergy() + 5);
						} else {
							StaticScenario.prompt =
								'The wave ends too soon. Too much tempura sits under the heat lamp, and everyone can see the waste.\n-30 station effectiveness\n-60 power\n-6 sanity';

							mStats.addPEffectivness(-30);
							mStats.subtractPPower(60);
							mStats.addPSanity(-6);
						}
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Drop only a small cushion',
					onPress: () => {
						click();
						if (Math.random() < 0.5) {
							StaticScenario.prompt =
								'The wave keeps coming and your small cushion disappears instantly. You avoid waste, but the station falls behind.\n-18 station effectiveness';

							mStats.addPEffectivness(-18);
						} else {
							StaticScenario.prompt =
								'The wave ends and your small cushion is just enough. It is not flashy, but it keeps the fryer clean.\n+8 station effectiveness\n+25 power';

							mStats.addPEffectivness(8);
							mStats.addPPower(25);
						}
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					'You wait too long and the tempura orders swamp the fryer. The delay spreads through the whole line.\n-28 station effectiveness\n-110 power\n-12 sanity';

				mStats.addPEffectivness(-28);
				mStats.subtractPPower(110);
				mStats.addPSanity(-12);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		var subjectObj = mStats.getRandomServer(true);
		var subject = subjectObj.name.getFirst();
		var possessive = mStats.getGenderPossessiveCharacter(subjectObj);
		return addScenarioDefaults({
			stations: [STATIONS.SAUCE],
			involvedCharacters: [subjectObj],
			prompt:
				subject +
				' asks if the sauce you just poured is level 4. You know it is level 2, not level 4.',
			buttons: [
				{
					title: 'Tell ' + subject + ' it is level 2',
					onPress: () => {
						click();
						StaticScenario.prompt =
							subject +
							' catches the issue before it reaches the customer and keeps ' +
							possessive +
							' work clean.\n+25 ' +
							subject +
							"'s power\n+20 power";

						mStats.addCPower(subjectObj, 25);
						mStats.addPPower(20);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Say it is level 4',
					onPress: () => {
						click();
						StaticScenario.prompt =
							subject +
							' serves the wrong spice level. The customer complains hard, and the mistake comes back on both of you.\n-250 ' +
							subject +
							"'s power\n-90 power";

						mStats.addCPower(subjectObj, -250);
						mStats.subtractPPower(90);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					subject +
					' has to move without an answer. The order becomes a guessing game, and the crew sees the confusion.\n-60 ' +
					subject +
					"'s power\n-50 power";

				mStats.addCPower(subjectObj, -60);
				mStats.subtractPPower(50);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		var subjectObj = mStats.getRandomServer(true);
		var subject = subjectObj.name.getFirst();
		return addScenarioDefaults({
			stations: [STATIONS.SAUCE],
			involvedCharacters: [subjectObj],
			prompt:
				subject +
				' asks if the curry you just made is vegetarian. You know this batch has chicken stock in it.',
			buttons: [
				{
					title: 'Tell the truth',
					onPress: () => {
						click();
						StaticScenario.prompt =
							subject +
							' stops the order before it becomes a customer problem. The crew respects that the two of you caught it early.\n+30 ' +
							subject +
							"'s power\n+30 power";

						mStats.addCPower(subjectObj, 30);
						mStats.addPPower(30);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Say it is vegetarian',
					onPress: () => {
						click();
						StaticScenario.prompt =
							subject +
							' brings out food that should never have gone to that customer. The customer gets furious, and the crew judges both you and ' +
							subject +
							'.\n-320 ' +
							subject +
							"'s power\n-120 power\n-10 sanity";

						mStats.addCPower(subjectObj, -320);
						mStats.subtractPPower(120);
						mStats.addPSanity(-10);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					'You do not answer fast enough. ' +
					subject +
					' delays the table, and the shift gets annoyed at the avoidable slowdown.\n-50 ' +
					subject +
					"'s power\n-50 power";

				mStats.addCPower(subjectObj, -50);
				mStats.subtractPPower(50);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		var subjectObj = mStats.getRandomServer(true);
		var subject = subjectObj.name.getFirst();
		return addScenarioDefaults({
			stations: [STATIONS.SAUCE, STATIONS.RICE],
			involvedCharacters: getUniqueCharacters([subjectObj, ...mStats.getShiftCharacters()]),
			prompt:
				subject +
				' is stuck on dishes while the pot rack is almost empty. If you scorch your next pot, the dish pit will fall badly behind.',
			buttons: [
				{
					title: 'Let the pot scorch',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'The scorched pot takes forever to wash. The dish pit backs up, clean pans stop coming back, and the kitchen starts blaming ' +
							subject +
							' even though you caused the problem.\n-25 power\n-260 ' +
							subject +
							"'s power";

						mStats.subtractPPower(25);
						mStats.addCPower(subjectObj, -260);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Keep the pot clean',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'You keep the pot clean enough to wash quickly. The rack keeps moving, and the whole shift gets a little smoother.\n+8 power for the whole shift';

						mStats.getShiftCharacters().forEach(character => {
							mStats.addCPower(character, 8);
						});
						mStats.addPPower(8);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					'The pot burns while you hesitate. Nobody knows if it was carelessness or panic, but the dish pit pays for it.\n-20 power\n-90 ' +
					subject +
					"'s power";

				mStats.subtractPPower(20);
				mStats.addCPower(subjectObj, -90);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
	() => {
		var subjectObj = mStats.getRandomServer(true);
		var subject = subjectObj.name.getFirst();
		return addScenarioDefaults({
			stations: [STATIONS.RICE],
			involvedCharacters: getUniqueCharacters([subjectObj, ...mStats.getShiftCharacters()]),
			prompt:
				'You are washing a rice insert while ' +
				subject +
				' is on dishes. If you leave rice crust stuck to the bottom, it will slow the dish station down hard.',
			buttons: [
				{
					title: 'Leave the crust',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'The rice crust turns into a dish pit nightmare. The insert takes too long to clean, counter space fills up, and the crew mostly blames ' +
							subject +
							' for the backup.\n-20 power\n-220 ' +
							subject +
							"'s power";

						mStats.subtractPPower(20);
						mStats.addCPower(subjectObj, -220);
						StaticScenario.handleOnPress();
					},
				},
				{
					title: 'Scrape it properly',
					onPress: () => {
						click();
						StaticScenario.prompt =
							'You scrape the insert properly before it hits dish. ' +
							subject +
							' keeps dishes moving and the kitchen has what it needs.\n+10 power for the whole shift\n+5 station effectiveness';

						mStats.getShiftCharacters().forEach(character => {
							mStats.addCPower(character, 10);
						});
						mStats.addPPower(10);
						mStats.addPEffectivness(5);
						StaticScenario.handleOnPress();
					},
				},
			],
			maxTime: 10,
			onTimeout: () => {
				StaticScenario.prompt =
					'You stand there too long and the insert dries out with rice still stuck to it. Dish gets backed up, and everyone gets irritated.\n-25 power\n-70 ' +
					subject +
					"'s power";

				mStats.subtractPPower(25);
				mStats.addCPower(subjectObj, -70);
				StaticScenario.handleOnTimeOut();
			},
		});
	},
];

scenariosTempletes[0].stations = [STATIONS.SAUCE];
scenariosTempletes[1].stations = [STATIONS.RICE];
scenariosTempletes[2].stations = ALL_STATIONS;
scenariosTempletes[3].stations = [STATIONS.SAUCE, STATIONS.FRYER];
scenariosTempletes[4].stations = [STATIONS.FRYER];
scenariosTempletes[5].stations = ALL_STATIONS;
scenariosTempletes[6].stations = [STATIONS.SAUCE];
scenariosTempletes[7].stations = ALL_STATIONS;
scenariosTempletes[8].stations = ALL_STATIONS;
scenariosTempletes[9].stations = [STATIONS.RICE];
scenariosTempletes[10].stations = ALL_STATIONS;
scenariosTempletes[11].stations = [STATIONS.FRYER];
scenariosTempletes[12].stations = [STATIONS.SAUCE];
scenariosTempletes[13].stations = [STATIONS.SAUCE, STATIONS.RICE];
scenariosTempletes[14].stations = ALL_STATIONS;
scenariosTempletes[15].stations = [STATIONS.SAUCE, STATIONS.RICE];
scenariosTempletes[16].stations = [STATIONS.FRYER];
scenariosTempletes[17].stations = [STATIONS.FRYER];
scenariosTempletes[18].stations = [STATIONS.SAUCE];
scenariosTempletes[19].stations = [STATIONS.SAUCE];
scenariosTempletes[20].stations = [STATIONS.SAUCE, STATIONS.RICE];
scenariosTempletes[21].stations = [STATIONS.RICE];

export default scenariosTempletes;
