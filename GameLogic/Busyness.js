import mStats from './ManageStats/ManageStats';

var busyChapter = 0;

var Busyness = {
	current: null,
	curentAry: null,
	difficulty: null,
	init: difficulty => {
		Busyness.difficulty = difficulty;
		var index = Math.round(Math.random() * 4);
		if (Busyness.currentAry == null) {
			var aryBuffer = Busyness.getAry(difficulty, index);
			Busyness.putAry(aryBuffer);
		}

		Busyness.current = Busyness.curentAry[0];
		busyChapter = 0;

		Busyness.manageBusyness();
		return Busyness.currentAry;
	},
	getAry: (difficulty, ranIndex) => {
		if (difficulty === 'easy') {
			return Busyness.easyArys[ranIndex];
		} else if (difficulty === 'medium') {
			return Busyness.mediumArys[ranIndex];
		} else if ('hard') {
			return Busyness.hardArys[ranIndex];
		}
	},
	putAry: ary => {
		Busyness.curentAry = ary;
	},
	getCurrentAry: () => {
		try {
			if (Busyness.curentAry == null) {
				throw 'current is not set';
			}
		} catch (err) {
			console.error(err);
		}

		return Busyness.curentAry;
	},
	getCurrent: () => {
		return Busyness.current;
	},
	setCurrent: current => {
		Busyness.current = current;
	},
	setBusyChapter: value => {
		busyChapter = value;
	},
	getBusynessReward: mStats => {
		if (Busyness.current >= 7 && mStats.getPEffectivness() > 0) {
			return 8;
		}
		return 1;
	},
	manageBusyness: () => {
		//This function is not allowed to set data in this object directly
		var lighting = mStats.getLighting();
		var time = mStats.getTime();
		var current = mStats.getCurrentBusyAry();

		if (lighting === 'day' && time == Busyness.dayInflections[busyChapter]) {
			mStats.setBusyness(current[busyChapter]);
			mStats.environment.busyness.setBusyChapter(busyChapter + 1);
		} else if (lighting === 'night' && time == Busyness.nightInflections[busyChapter]) {
			mStats.setBusyness(current[busyChapter]);
			mStats.environment.busyness.setBusyChapter(busyChapter + 1);
		}
	},
};

//The dificultys from the start of the shift (index 0) to the end of the shift (index 7)
//1 being slow
//10 being "record breaking" rush

//Morning shifts Monday - Thursday
Busyness.easyArys = [
	[1, 1, 1, 4, 2, 3, 2, 1], //Each row represends a posible bussyness varient
	[1, 1, 1, 2, 3, 2, 1, 1],
	[1, 2, 2, 4, 2, 2, 1, 1],
	[1, 1, 4, 2, 2, 3, 2, 1],
	[1, 1, 1, 2, 3, 1, 1, 1],
];

//Night shifts Monday - Thursday and day shifts Firday - Sunday
Busyness.mediumArys = [
	[1, 2, 2, 3, 3, 3, 2, 1],
	[1, 1, 2, 5, 4, 2, 1, 1],
	[1, 2, 3, 5, 4, 3, 1, 1],
	[1, 2, 4, 5, 6, 2, 2, 1],
	[1, 2, 4, 5, 3, 2, 2, 1],
];

//Night shifts Friday - Sunday
Busyness.hardArys = [
	[2, 3, 5, 7, 9, 7, 2, 1],
	[2, 3, 5, 10, 10, 7, 2, 1],
	[1, 2, 5, 7, 10, 7, 2, 1],
	[1, 2, 4, 7, 9, 10, 2, 1],
	[2, 2, 4, 10, 7, 2, 2, 1],
];

Busyness.dayInflections = [1100, 1130, 1200, 100, 200, 300, 400, 430];

Busyness.nightInflections = [500, 530, 600, 630, 700, 800, 900, 930];

export default Busyness;
