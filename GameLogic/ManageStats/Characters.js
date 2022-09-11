import Person from './Person';

var MIN_POWER = -100;
var MAX_SKILL = 20;
var MAX_SKILL_POINTS = 100;
var MAX_EFFECTIVNESS = 50;
var MIN_EFFECTIVNESS = -50;
var MAX_SANITY = 40;
var MIN_SANITY = -30;
var MAX_HAPPYNESS = 10;
var MIN_HAPPYNESS = -10;
var MAX_RESPECTABILITY = 10;
var MIN_RESPECTABILITY = -10;
var MAX_CLEANLINESS = 10;
var MIN_CLEANLINESS = -10;
var MAX_ANGER = 10;
var MIN_ANGER = 0;

function Character() {
	//This function extends person
	Person.call(this);
	this.power = null;
	this.skill = null;
	this.skillPoints = null;
	this.currentStation = null;
	this.job = null;
	this.effectivness = null;
	this.sanity = null;
	this.happyness = null;
	this.respectability = null;
	this.cleanliness = null;
	this.anger = null;
	this.characterInit = (person, character) => {
		this.personInit(person.name, person.age, person.gender, person.wealth, person.personality);
		this.power = character.power;
		this.skill = character.skill;
		this.skillPoints = character.skillPoints;
		this.currentStation = character.currentStation;
		this.job = character.job;
		this.effectivness = character.effectivness;
		this.sanity = character.sanity;

		//Other character related info to init
		this.happyness = character.happyness;
		this.respectability = character.respectability;
		this.cleanliness = character.cleanliness;
		this.anger = character.anger;
	};

	this.getPower = () => {
		return this.power;
	};
	this.setPower = power => {
		if (power < MIN_POWER) {
			this.power = MIN_POWER;
		} else {
			this.power = power;
		}
	};

	this.getSkill = () => {
		return this.skill;
	};
	this.setSkill = skill => {
		if (skill > MAX_SKILL) {
			skill = MAX_SKILL;
		}
		this.skill = skill;
	};

	this.getSkillPoints = () => {
		return this.skillPoints;
	};
	this.setSkillPoints = points => {
		if (points > MAX_SKILL_POINTS) {
			points = MAX_SKILL_POINTS;
		}
		this.skillPoints = points;
	};

	this.getJob = () => {
		return this.job;
	};
	this.setjob = job => {
		this.job = job;
	};

	this.getCurrentStation = () => {
		return this.currentStation;
	};
	this.setCurrentStation = newStation => {
		this.currentStation = newStation;
	};

	this.getEffectivness = () => {
		return this.effectivness;
	};
	this.setEffectivness = effectivness => {
		if (effectivness > MAX_EFFECTIVNESS) {
			effectivness = MAX_EFFECTIVNESS;
		} else if (effectivness < MIN_EFFECTIVNESS) {
			effectivness = MIN_EFFECTIVNESS;
		}
		this.effectivness = effectivness;
	};

	this.getSanity = () => {
		return this.sanity;
	};
	this.setSanity = sanity => {
		if (sanity > MAX_SANITY) {
			sanity = MAX_SANITY;
		} else if (sanity < MIN_SANITY) {
			sanity = MIN_SANITY;
		}
		this.sanity = sanity;
	};

	this.getHappyness = () => {
		return this.happyness;
	};
	this.setHappyness = happyness => {
		if (happyness > MAX_HAPPYNESS) {
			happyness = MAX_HAPPYNESS;
		} else if (happyness < MIN_HAPPYNESS) {
			happyness = MIN_HAPPYNESS;
		}
		this.happyness = happyness;
	};

	this.getRespectability = () => {
		return this.respectability;
	};
	this.setRespectability = respectability => {
		if (respectability > MAX_RESPECTABILITY) {
			respectability = MAX_RESPECTABILITY;
		} else if (respectability < MIN_RESPECTABILITY) {
			respectability = MIN_RESPECTABILITY;
		}
		this.respectability = respectability;
	};

	this.getCleanliness = () => {
		return this.cleanliness;
	};
	this.setCleanliness = cleanliness => {
		if (cleanliness > MAX_CLEANLINESS) {
			cleanliness = MAX_CLEANLINESS;
		} else if (cleanliness < MIN_CLEANLINESS) {
			cleanliness = MIN_CLEANLINESS;
		}
		this.cleanliness = cleanliness;
	};

	this.getAnger = () => {
		return this.anger;
	};
	this.setAnger = anger => {
		if (anger > MAX_ANGER) {
			anger = MAX_ANGER;
		} else if (anger < MIN_ANGER) {
			anger = MIN_ANGER;
		}
		this.anger = anger;
	};
}

export default Character;
