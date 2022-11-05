import mStats from '../ManageStats/ManageStats';
import StaticScenario from '../Scenario/StaticScenario';
import { click } from '../AudioSystem';

const difficulty = 'dyslexic';
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

		return {
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
		};
	},
	() => {
		var subjectObj01 = mStats.getRandomCook(true);
		var subjectObj02 = mStats.getRandomCookWhosNot(subjectObj01.name.get(), true);
		var subject01 = subjectObj01.name.getFirst();
		var subject02 = subjectObj02.name.getFirst();
		return {
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
		};
	},
	() => {
		var subject = mStats.getRandomCook(true).name.getFirst();
		return {
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
		};
	},
	() => {
		var subjectObj = mStats.getRandomServer(true);
		var subjectObj02 = mStats.getRandomeCharacterWhosNot([subjectObj], true);
		var subject = subjectObj.name.getFirst();
		var subPro = mStats.getGenderPronounOfCharacter(subjectObj);
		return {
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
		};
	},
	() => {
		return {
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
		};
	},
	() => {
		var subjectObj = mStats.getRandomCharacter(true);
		var subject = subjectObj.name.getFirst();
		return {
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
		};
	},
	() => {
		var subject01Obj = mStats.getRandomServer(true);
		var subject02Obj = mStats.getRandomCook(true);
		var subjects01sRespectability = mStats.getCRespectability(subject01Obj);
		var subjects02sRespectability = mStats.getCRespectability(subject02Obj);
		var playerRespectability = mStats.getPRespectability();
		var subject01 = subject01Obj.name.getFirst();
		var subject02 = subject02Obj.name.getFirst();
		return {
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
		};
	},
	() => {
		var subjectObj = mStats.getRandomCharacter(true);
		var subject = subjectObj.name.getFirst();
		return {
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
		};
	},
	() => {
		var playerRespectability = mStats.getPRespectability();
		return {
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
		};
	},
	() => {
		//In future make sure this senario is not called if player is on frier
		var subjectObj = mStats.getCookFromStation('frier');
		if (!subjectObj) {
			subjectObj = mStats.getRandomCook();
		}
		var subject = subjectObj.name.getFirst();
		return {
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
		};
	},
];

export default scenariosTempletes;
