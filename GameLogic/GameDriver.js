//Global Vars
import mStats from './ManageStats/ManageStats';
import busyness from './Busyness';
import storyLogic from './StoryLogic';
import shiftHub from './ShiftHub';
import Sound from './AudioSystem';

var pFrame = 0;
var pFrameLong = 0;
var continusFrame = 0;
var moreUpdateWork = [];
var moreTicWork = [];
var moreContinusWork = [];
var endLevelWork = [];
var levelEnded = false;
var leftGameplay = false;

let GameDriver = {
	awake: data => {
		//This function is to be called after async data has been fetched
		//Game Drriver is the back bone of GameLogic so it should bee the awake hook for gameLogic
		mStats.awake(data, GameDriver);
		storyLogic.init(data);
		shiftHub.init(data.availableDays);
	},
	start: settings => {
		//Handle all game init functions here
		console.log('Start happeoned');
		levelEnded = false;
		mStats.setScenarioPresent(false);

		mStats.init(settings);
	},
	update: () => {
		//updates happons about 60 time a seceond.
		if (GameDriver.determinePause()) {
			++pFrame;
		}
		continusFrame++;
		if (continusFrame >= 60) {
			continusFrame = 0;
			GameDriver.continusTime();
		}
		if (pFrame >= 60) {
			pFrame = 0;
			GameDriver.tic();
		}

		moreUpdateWork.forEach(work => {
			work();
		});
	},
	tic: () => {
		//tic happons about one a seceond while game is playing
		pFrameLong++;
		console.log('Tic');

		mStats.getEnvironment().ticTime();
		busyness.manageBusyness();

		mStats.setPPower(
			mStats.getPPower() + Math.round(0.12 * mStats.getPEffectivness() * busyness.getBusynessReward(mStats))
		);
		if (pFrameLong >= 10) {
			pFrameLong = 0;
			GameDriver.longTic();
		}

		moreTicWork.forEach(work => {
			work();
		});

		if (determineEndCondition() || determinePlayerWon() || determinePlayerLost()) {
			GameDriver.endLevel();
		}
	},
	longTic: () => {
		console.log('--Game Driver report--');
		console.log('Update extra work length: ' + moreUpdateWork.length);
		console.log('Tic extra work length: ' + moreTicWork.length);
		console.log('end level work length: ' + endLevelWork.length);

		mStats.setShiftCharactersPlayerTicChange(mStats.getShiftCharacters());
		mStats.setShiftCharactersPlayerTicChange(mStats.getPlayer());
		mStats.setPSkillPoints(mStats.getPSkillPoints() + Math.round(mStats.getPSkill() / 2));
		if (mStats.getPSanity() < 0) {
			mStats.setPEffectivness(mStats.getPEffectivness() + mStats.getPSanity());
		}
	},
	on: (what, work, id) => {
		if (id) {
			work.id = id;
		}
		if (what === 'update') {
			moreUpdateWork.push(work);
		} else if (what === 'tic') {
			moreTicWork.push(work);
		} else if (what === 'continue') {
			moreContinusWork.push(work);
		} else if ((what = 'end level')) {
			endLevelWork.push(work);
		}
	},
	removeOn: (what, id) => {
		if (what === 'continue') {
			moreContinusWork.forEach((work, i) => {
				if (work.id === id) {
					moreContinusWork.splice(i, 1);
				}
			});
		}
	},
	scenarioCheck: () => {
		//consider moving this to more apropiet place
		let result = {
			reply: false,
		};
		if (Math.round(Math.random() * 10) <= 1) {
			result.reply = true;
			mStats.setScenarioPresent(true);
		}

		return result;
	},
	endLevel: () => {
		var reward = 2;
		if (mStats.getPEffectivnessGain() >= 100) {
			reward = 4;
		}

		mStats.setPSkill(mStats.getPSkill() + reward);

		mStats.getShiftCharacters().forEach(character => {
			//This is why endDay index was subtracted by one. that sub 1 index is being handle right now
			mStats.setCharacterPowerFromSanity(character);
		});

		mStats.setPSanity(mStats.getPSanity() - 10);

		//Calling this function creates a game report for the player to view later
		mStats.quit();

		endLevelWork.forEach(work => {
			work({
				hasWon: determinePlayerWon(),
				hasLost: determinePlayerLost(),
			});
		});

		GameDriver.quitGame();
	},
	quitGame: () => {
		//Handles garbage collection and other misc
		levelEnded = true;

		moreTicWork = [];
		moreUpdateWork = [];
		moreContinusWork = [];
		endLevelWork = [];
	},
	determinePause: () => {
		if (!mStats.getScenarioPresent() && mStats.getInForground() && !levelEnded && !leftGameplay) {
			return true;
		}
		return false;
	},
	leftGamePlay: hasLeft => {
		leftGameplay = hasLeft;
	},
	possibleGamePlayReturn: hasReturned => {
		leftGameplay = !hasReturned;
	},
};

//Augzilery functions
GameDriver.continusTime = () => {
	moreContinusWork.forEach(work => {
		work();
	});
};
GameDriver.giveNavigator = navigator => {
	GameDriver.navigator = navigator;
};
GameDriver.getNavigator = () => {
	return GameDriver.navigator;
};

function determineEndCondition() {
	var light = mStats.getLighting();
	var time = mStats.getTime();
	var hour = Math.floor(time / 100);
	var end = false;

	if (light === 'day' && hour >= 5 && hour != 11 && hour != 10 && hour != 12) {
		end = true;
		levelEnded = true;
	} else if (light === 'night' && hour >= 10) {
		end = true;
		levelEnded = true;
	}

	return end;
}

function determinePlayerWon() {
	if (mStats.getPPower() >= 10000 && !mStats.hasAlreadyWon()) {
		return true;
	}
	return false;
}
function determinePlayerLost() {
	return mStats.determinLoseCondition();
}

export default GameDriver;
