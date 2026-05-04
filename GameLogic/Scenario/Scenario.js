import gameDriver from '../GameDriver/GameDriver';
import mStats from '../ManageStats/ManageStats';
import util from '../../utilities';
import StaticScenario from './StaticScenario';
import Sound from '../AudioSystem';
import scenariosTempletes, {
	getAvailableScenarioTemplates,
	getMaxTimeMultiplyer,
	PLACEHOLDER_SCENARIO_IMAGE,
	PLACEHOLDER_SCENARIO_SOUND,
} from '../PresetsAndTemplates/ScenarioTempletes';

var timesUp = false;

function Scenario() {
	//choose scenario templete object
	var availableTemplates = getAvailableScenarioTemplates(mStats.getPStation());
	var templates = availableTemplates.length > 0 ? availableTemplates : scenariosTempletes;
	var randomIndex = util.getRandomIndexFromArray(templates);
	StaticScenario.currentScenario = prepareScenario(templates[randomIndex]());
	StaticScenario.prompt = StaticScenario.currentScenario.prompt;
	StaticScenario.involvedCharacters = StaticScenario.currentScenario.involvedCharacters || [];
	StaticScenario.characterStatChanges = [];
	StaticScenario.image = StaticScenario.currentScenario.image || PLACEHOLDER_SCENARIO_IMAGE;
	StaticScenario.soundEffect = StaticScenario.currentScenario.soundEffect || PLACEHOLDER_SCENARIO_SOUND;
	playScenarioSound(StaticScenario.soundEffect);

	StaticScenario.currentTime = StaticScenario.currentScenario.maxTime * getMaxTimeMultiplyer();

	//Handling scenario timer
	gameDriver.on(
		'continue',
		() => {
			this.continueTime();
		},
		'scenario counter'
	);
	this.continueTime = () => {
		if (StaticScenario.currentTime > 0) {
			StaticScenario.currentTime -= 1;
			if (StaticScenario.onTic) {
				StaticScenario.onTic(StaticScenario.currentTime);
			}
			if (StaticScenario.currentTime <= 0) {
				timesUp = true;
			}
		} else if (timesUp) {
			timesUp = false; //Time is up only once
			StaticScenario.currentScenario.onTimeout();
		}
	};

	this.getPrompt = () => {
		return StaticScenario.prompt;
	};
	(this.getButtons = () => {
		return StaticScenario.currentScenario.buttons;
	}),
		(this.getInvolvedCharacters = () => {
			return StaticScenario.involvedCharacters || [];
		}),
		(this.getCharacterStatChanges = () => {
			return StaticScenario.characterStatChanges || [];
		}),
		(this.getImage = () => {
			return StaticScenario.image || PLACEHOLDER_SCENARIO_IMAGE;
		}),
		(this.onButtonPress = work => {
			StaticScenario.onPress = work;
		});
	this.onTic = work => {
		StaticScenario.onTic = work;
	};
	this.onTimeout = work => {
		StaticScenario.onTimeout = work;
	};
	this.getCurrentTime = () => {
		return StaticScenario.currentTime;
	};
	this.stopTime = () => {
		gameDriver.removeOn('continue', 'scenario counter');
	};
	this.quit = () => {
		StaticScenario.onPress = null;
		StaticScenario.onTic = null;
		StaticScenario.onTimeout = null;
		StaticScenario.involvedCharacters = [];
		StaticScenario.characterStatChanges = [];
		StaticScenario.image = null;
		StaticScenario.soundEffect = null;
		gameDriver.removeOn('continue', 'scenario counter');
	};
}

function prepareScenario(scenario) {
	var involvedCharacters = (scenario.involvedCharacters || []).filter(Boolean);
	scenario.involvedCharacters = involvedCharacters;
	scenario.buttons = scenario.buttons.map(button => {
		var originalOnPress = button.onPress;
		return {
			...button,
			onPress: () => {
				var beforeStats = snapshotCharacters(involvedCharacters);
				var onPressCallback = StaticScenario.onPress;
				StaticScenario.onPress = null;
				originalOnPress();
				StaticScenario.characterStatChanges = getCharacterStatChanges(beforeStats, involvedCharacters);
				StaticScenario.onPress = onPressCallback;
				StaticScenario.handleOnPress();
			},
		};
	});

	var originalOnTimeout = scenario.onTimeout;
	scenario.onTimeout = () => {
		var beforeStats = snapshotCharacters(involvedCharacters);
		var onTimeoutCallback = StaticScenario.onTimeout;
		StaticScenario.onTimeout = null;
		originalOnTimeout();
		StaticScenario.characterStatChanges = getCharacterStatChanges(beforeStats, involvedCharacters);
		StaticScenario.onTimeout = onTimeoutCallback;
		StaticScenario.handleOnTimeOut();
	};

	return scenario;
}

function playScenarioSound(soundEffect) {
	var scenarioSound = new Sound(soundEffect || PLACEHOLDER_SCENARIO_SOUND);
	scenarioSound.play();
}

function snapshotCharacters(characters) {
	var snapshots = {};
	characters.forEach(character => {
		var key = getCharacterKey(character);
		if (key && hasCharacterStats(character)) {
			snapshots[key] = {
				power: character.getPower(),
				effectivness: character.getEffectivness(),
				sanity: character.getSanity(),
				respectability: character.getRespectability(),
				cleanliness: character.getCleanliness(),
				anger: character.getAnger(),
			};
		}
	});
	return snapshots;
}

function getCharacterStatChanges(beforeStats, characters) {
	var changes = [];
	characters.forEach(character => {
		var key = getCharacterKey(character);
		var before = beforeStats[key];
		if (!before || !hasCharacterStats(character)) {
			return;
		}
		var after = {
			power: character.getPower(),
			effectivness: character.getEffectivness(),
			sanity: character.getSanity(),
			respectability: character.getRespectability(),
			cleanliness: character.getCleanliness(),
			anger: character.getAnger(),
		};
		Object.keys(after).forEach(stat => {
			var amount = after[stat] - before[stat];
			if (amount !== 0) {
				changes.push({
					character,
					stat,
					amount,
				});
			}
		});
	});
	return changes;
}

function hasCharacterStats(character) {
	return character && character.getPower && character.getEffectivness && character.getSanity;
}

function getCharacterKey(character) {
	if (!character) {
		return null;
	}
	if (character.name && character.name.get) {
		return character.name.get();
	}
	return character.name || character.id || null;
}

export default Scenario;
