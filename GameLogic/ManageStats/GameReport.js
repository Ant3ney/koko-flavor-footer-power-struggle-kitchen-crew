import mStats from './ManageStats';

var gameReport = {
	initial: null,
	createInitial: () => {
		gameReport.initial = null;
		gameReport.final = null;
		gameReport.compiled = null;

		var initial = {
			power: mStats.getPPower(),
			sanity: mStats.getPSanity(),
			effectivness: mStats.getPEffectivness(),
		};

		gameReport.initial = initial;
	},
	getInitial: () => {
		return gameReport.initial;
	},

	final: null,
	createFinal: () => {
		var final = {
			power: mStats.getPPower(),
			sanity: mStats.getPSanity(),
			effectivness: mStats.getPEffectivness(),
			skillPointsUsed: mStats.getPSkillPointsUsed(),
		};

		gameReport.final = final;
	},
	getFinal: () => {
		return gameReport.final;
	},
	compiled: null,
	createCompiled: () => {
		var compiled = gameReport.compiled;

		compiled = {
			powerGained: gameReport.final.power - gameReport.initial.power,
			sanityChange: gameReport.final.sanity - gameReport.initial.sanity,
			effectivness: gameReport.final.effectivness - gameReport.initial.effectivness,
			effectivnessGain: mStats.getPEffectivnessGain(),
			skillPointsUsed: gameReport.final.skillPointsUsed,
			skillGained: mStats.getPEffectivnessGain() >= 100 ? 4 : 2,
		};

		gameReport.compiled = compiled;
	},
	getCompiled: () => {
		return gameReport.compiled;
	},
};

export default gameReport;
