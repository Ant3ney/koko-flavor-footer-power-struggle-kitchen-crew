import characters from '../PresetsAndTemplates/testCharacters';
import storyLogic from '../StoryLogic';

//Private global vars
var previousEffectivnessChange = 0;
var lastBusy = null;

function SetStats() {
	//----- Player sets -----
	this.setPlayer = player => {
		this.player = player;
		this.setStatsListener();
	};
	this.initPlayer = (person, character) => {
		this.player.characterInit(person, character);
		this.setStatsListener();
	};
	this.setPName = (fName, lName) => {
		this.player.name.set(fName, lName);
		this.setStatsListener();
	};
	this.setPAge = age => {
		this.player.setAge(age);
		this.setStatsListener();
	};
	this.setPGender = gender => {
		this.player.setGender(gender);
		this.setStatsListener();
	};
	this.setPWealth = wealth => {
		this.player.setWealth(wealth);
		this.setStatsListener();
	};
	this.setPPersonality = personality => {
		this.player.setPersonality(personality);
		this.setStatsListener();
	};
	this.subtractPPower = amount => {
		var pastPower = this.getPPower();
		var newPower = pastPower - amount;

		this.setPPower(newPower);
	};
	this.addPPower = amount => {
		var pastPower = this.getPPower();
		var newPower = pastPower + amount;

		this.setPPower(newPower);
	};
	this.setPPower = power => {
		this.player.setPower(power);
		this.setStatsListener();
	};
	this.setPSkill = skill => {
		this.player.setSkill(skill);
		this.setStatsListener();
	};
	this.setPSkillPoints = skillPoints => {
		this.player.setSkillPoints(skillPoints);
		this.setStatsListener();
	};
	this.subtractPSkillPoints = amount => {
		this.pSkillPointsUsed += amount;
		var currentSkill = this.getPSkillPoints();

		this.player.setSkillPoints(currentSkill - amount);

		this.setStatsListener();
	};
	this.setPCurrentStation = currentStation => {
		this.player.setCurrentStation;
		this.setStatsListener();
	};
	this.setPJob = job => {
		this.player.setJob(job);
		this.setStatsListener();
	};
	this.subtractPEffectivness = amount => {
		var pastEffectivness = this.getPEffectivness();
		var newEffectivness = pastEffectivness - amount;

		this.setPEffectivness(newEffectivness);
	};
	this.setPEffectivness = effectivness => {
		//Record effectivness progress form game report
		var pastEffectivness = this.player.getEffectivness();
		var diffrence = effectivness - pastEffectivness;
		if (diffrence > 0) {
			this.totaleffectivnessGain += diffrence;
		}

		this.player.setEffectivness(effectivness);
		this.setStatsListener();
	};
	this.setPSanity = sanity => {
		this.player.setSanity(sanity);
		this.setStatsListener();
	};
	this.setPEnergy = energy => {
		this.player.setEnergy(energy);
		this.setStatsListener();
	};
	this.setPRespectability = respectability => {
		this.player.setRespectability(respectability);
		this.setStatsListener();
	};
	this.addPRespectability = amount => {
		var currentRespect = this.player.getRespectability();
		var newRespect = currentRespect + amount;
		this.player.setRespectability(newRespect);

		this.setStatsListener();
	};
	this.setPHappyness = happyness => {
		this.player.setHappyness(happyness);
		this.setStatsListener();
	};
	this.setPCleanliness = cleanliness => {
		this.player.setCleanliness(cleanliness);
		this.setStatsListener();
	};
	this.setPAnger = anger => {
		this.player.setAnger(anger);
		this.setStatsListener();
	};
	this.setPStation = station => {
		this.player.setCurrentStation(station);

		var cook01 = this.getRandomCook();
		var cook02 = this.getRandomCookWhosNot(cook01);

		if (station === 'sause') {
			this.setCharacterStation(cook01, 'rice');
			this.setCharacterStation(cook02, 'frier');
		} else if (station === 'frier') {
			this.setCharacterStation(cook01, 'sause');
			this.setCharacterStation(cook02, 'rice');
		} else {
			//station = rice
			this.setCharacterStation(cook01, 'frier');
			this.setCharacterStation(cook02, 'sause');
		}
		this.setStatsListener();
	};
	this.addPSanity = amount => {
		var currentSanity = this.player.getSanity();
		var newSanity = currentSanity + amount;
		this.player.setSanity(newSanity);
		this.setStatsListener();
	};
	this.addPEffectivness = amount => {
		var currentEffectivness = this.player.getEffectivness();
		var newEffectivness = currentEffectivness + amount;
		this.player.setEffectivness(newEffectivness);

		this.setStatsListener();
	};
	this.addPCleanliness = amount => {
		var currentCleanliness = this.player.getCleanliness();
		var newCleanliness = currentCleanliness + amount;
		this.player.setCleanliness(newCleanliness);

		this.setStatsListener();
	};
	this.addPAnger = amount => {
		var currentAnger = this.player.getAnger();
		var newAnger = currentAnger + amount;
		this.player.setAnger(newAnger);

		this.setStatsListener();
	};
	this.addPSkillPoints = amount => {
		var currentSkillPoints = this.getPSkillPoints();
		var newSkillPoints = currentSkillPoints + amount;
		this.player.setSkillPoints(newSkillPoints);

		this.setStatsListener();
	};
	this.resetPlayer = () => {
		//When the player wins or the player manualy resets
		this.player.setPower(10);
		this.player.setSkill(3);
		this.player.setSanity(30);

		this.setStatsListener();
	};

	//Hybrid sets for player and characters
	this.setShiftCharactersPlayerTicChange = subject => {
		if (subject.length) {
			this.shiftCharacters.forEach(character => {
				this.setHappynessChange(character);
				this.setCleanlinessEffects(character);
				this.setAngerEffects(character);
				this.setEffectivnessPowerChange(character);
			});
		} else {
			this.setHappynessChange(subject);
			this.setCleanlinessEffects(subject);
			this.setAngerEffects(subject);
		}
	};
	this.setHappynessChange = character => {
		var happyness = character.getHappyness();
		var currentEffectivness = character.getEffectivness();

		if (!happyness || happyness === 0) {
			return;
		}
		if (happyness > 0) {
			character.setSanity(character.getSanity() + 1);
			character.setEffectivness(currentEffectivness + 1);

			character.setHappyness(happyness - 1);
		} else {
			character.setSanity(character.getSanity() - 1);
			character.setEffectivness(currentEffectivness - 1);

			character.setHappyness(happyness + 1);
		}

		this.setStatsListener();
	};
	this.setEffectivnessPowerChange = character => {
		var effectivness = character.getEffectivness();
		var currentPower = character.getPower();

		character.setPower(currentPower + effectivness);

		this.setStatsListener();
	};
	this.setCleanlinessEffects = character => {
		var cleanliness = character.getCleanliness();
		if (cleanliness < 0) {
			var currentPower = character.getPower();

			character.setPower(currentPower + cleanliness);

			this.setStatsListener();
		}
	};
	this.setAngerEffects = character => {
		var anger = character.getAnger();
		var currentEffectivness = character.getEffectivness();

		if (anger > 0) {
			character.setEffectivness(currentEffectivness - anger);

			this.setStatsListener();
		}
	};
	this.setShiftReset = character => {
		character.setEffectivness(10);
		character.setSkillPoints(1);
	};
	//characterSets
	this.setCharacterConsequencesUpTo = (endDay, settings) => {
		//Difficult to test function(It has been partialy tested)

		var startDay = this.getCurrentDay();
		var dayAry = this.getDayArry();
		var currentDayIndex = dayAry.indexOf(startDay);
		var endIndex = dayAry.indexOf(endDay) - 1; //I subtract one because the gameplay will determine the stat changes on endDay

		for (var i = currentDayIndex; i <= endIndex; i++) {
			var parseDay = dayAry[i];

			this.characterSchedule[parseDay].day.forEach(character => {
				this.setCharacterPowerFromSanity(character);
			});
			this.characterSchedule[parseDay].night.forEach(character => {
				this.setCharacterPowerFromSanity(character);
			});
		}
	};
	this.setCharacterConsequencesOnDay = (day, lighting) => {
		if (lighting) {
			if (lighting === 'day') {
				this.characterSchedule[day].day.forEach(character => {
					this.setCharacterPowerFromSanity(character);
				});
			} else {
				//lighting = night
				this.characterSchedule[day].night.forEach(character => {
					this.setCharacterPowerFromSanity(character);
				});
			}
		} else {
			//Apply consequences for all day
			this.characterSchedule[day].day.forEach(character => {
				this.setCharacterPowerFromSanity(character);
			});
			this.characterSchedule[day].night.forEach(character => {
				this.setCharacterPowerFromSanity(character);
			});
		}
	};
	this.setCharacterPowerFromSanity = character => {
		var random = Math.round(Math.random() * 10);
		var randomThreshold;

		if (character.getSanity() >= 0) {
			if (character.getSanity() >= 30) {
				randomThreshold = 2;
			} else if (character.getSanity() >= 20) {
				randomThreshold = 4;
			} else if (character.getSanity() >= 10) {
				randomThreshold = 6;
			} else {
				randomThreshold = 8;
			}

			if (random >= randomThreshold) {
				this.addCPower(character, 200);
			} else {
				this.addCPower(character, 100);
			}
		} else {
			if (character.getSanity() <= -30) {
				randomThreshold = 8;
			} else if (character.getSanity() <= -20) {
				randomThreshold = 6;
			} else if (character.getSanity() <= -10) {
				randomThreshold = 4;
			} else {
				randomThreshold = 2;
			}
			if (random >= randomThreshold) {
				this.addCPower(character, -100);
			} else {
				this.addCPower(character, -200);
			}
		}
	};
	this.subtractChraracterPower = (character, subPower) => {
		var currentPower = character.getPower();
		var newPower = currentPower - subPower;

		this.setCharacterPower(character, newPower);
	};
	(this.setCharacterPower = (character, newPower) => {
		character.setPower(newPower);
		this.setStatsListener();
	}),
		(this.setCharacterStation = (character, station) => {
			character.setCurrentStation(station);
			this.setStatsListener();
		});
	this.refreshShiftCharacterStation = () => {
		var station = this.getPStation();
		var cook01 = this.getRandomCook();
		var cook02 = this.getRandomCookWhosNot(cook01);

		if (station === 'sause') {
			this.setCharacterStation(cook01, 'rice');
			this.setCharacterStation(cook02, 'frier');
		} else if (station === 'frier') {
			this.setCharacterStation(cook01, 'sause');
			this.setCharacterStation(cook02, 'rice');
		} else {
			//station = rice
			this.setCharacterStation(cook01, 'frier');
			this.setCharacterStation(cook02, 'sause');
		}

		this.setStatsListener();
	};
	this.setCharacterName = (character, name) => {
		character.name.set(name.first, name.last);
		this.setStatsListener();
	};

	//Adding character stats
	this.addCSanity = (character, amount) => {
		var currentSanity = character.getSanity();
		var newSanity = currentSanity + amount;

		character.setSanity(newSanity);
		this.setStatsListener();
	};
	this.addCEffectivness = (character, amount) => {
		var currentEffectivness = character.getEffectivness();
		var newEffectivness = currentEffectivness + amount;
		character.setEffectivness(newEffectivness);

		this.setStatsListener();
	};
	this.addCPower = (character, amount) => {
		var currentPower = character.getPower();
		var newPower = currentPower + amount;
		character.setPower(newPower);

		this.setStatsListener();
	};
	this.addCAnger = (character, amount) => {
		var currentAnger = character.getAnger();
		var newAnger = currentAnger + amount;
		character.setAnger(newAnger);

		this.setStatsListener();
	};
	this.addCRespectability = (character, amount) => {
		var currentRespectability = character.getRespectability();
		var newRespectability = currentRespectability + amount;
		character.setRespectability(newRespectability);

		this.setStatsListener();
	};

	//----- Environment sets -----
	this.setBusyness = newBsy => {
		if (lastBusy != newBsy) {
			lastBusy = newBsy;
			this.environment.busyness.setCurrent(newBsy);

			/* This formula dose not always work. Ask someone about it later
            previousEffectivnessChange = ((this.getPSkill() - newBsy) - previousEffectivnessChange);

            this.setPEffectivness(this.getPEffectivness() + previousEffectivnessChange);
            */
			this.setPEffectivness(this.getPEffectivness() - (newBsy * 2 - this.getPSkill()) * 2);
		}

		this.setStatsListener();
	};
	this.setLighting = light => {
		this.environment.lighting = light;
		this.setStatsListener();
	};
	this.setTime = time => {
		this.environment.time = time;
		this.setStatsListener();
	};
	this.incrementHour = () => {
		if (this.environment.time === 12) {
			this.environment.time = 1;
		} else {
			this.environment.time += 100;
		}
		this.setStatsListener();
	};

	//Misc Sets
	this.setScenarioPresent = scenario => {
		this.scenarioPresent = scenario;
		this.setStatsListener();
	};
	this.setInForground = inForground => {
		this.inForground = inForground;
		this.setStatsListener();
	};
	this.setCurrentDay = day => {
		this.currentDay = day;
		this.setStatsListener();
		this.dayChangeListener();
	};
	this.setSchedualFromShiftStructure = structure => {
		this.characterSchedule = this.createScheduleWithShiftStructure(structure);
		this.setStatsListener();
	};
	this.resetData = (gameDriver, optionalNav) => {
		var navigation;

		if (optionalNav) {
			navigation = optionalNav;
		} else {
			navigation = this.getNavigator();
		}

		navigation.navigate('Loading Local');

		this.alreadyWon = false;
		this.setStatsListener();

		fetch('https://coco-game-17308.herokuapp.com/testApi/resetData')
			.then(response => response.json())
			.then(data => {
				gameDriver.awake(data);

				//At this point this is a check to see if this is the users first time playing
				if (storyLogic.checkForUnhandledStory()) {
					console.log('Initing story');
				}
				navigation.navigate('Conversation', { type: 'beginning' });
			});
	};
	this.setAlreadyWon = won => {
		this.alreadyWon = won;
	};
}

export default SetStats;
