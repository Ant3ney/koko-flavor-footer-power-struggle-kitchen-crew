import gameDriver from '../GameDriver/GameDriver';
import mStats from '../ManageStats/ManageStats';
import util from '../../utilities';
import StaticScenario from './StaticScenario';
import scenariosTempletes from '../PresetsAndTemplates/ScenarioTempletes';
import { getMaxTimeMultiplyer } from '../PresetsAndTemplates/ScenarioTempletes';

var timesUp = false;

function Scenario() {
	//choose scenario templete object
	var randomIndex = util.getRandomIndexFromArray(scenariosTempletes);
	StaticScenario.currentScenario = scenariosTempletes[randomIndex]();
	StaticScenario.prompt = StaticScenario.currentScenario.prompt;

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
		gameDriver.removeOn('continue', 'scenario counter');
	};
}

export default Scenario;
