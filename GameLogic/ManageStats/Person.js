import Sound from '../AudioSystem/Sound';

function Person() {
	//only in this constructor can the varibles be edited without the use of healper functions

	this.personInit = (name, age, gender, wealth, personality) => {
		//In future, test out and see witch varibles can be private declaring them thisfunction.varible name. Maby a namelike this.private.name for something.

		this.name.firstname = name.firstName || 'nothing';
		this.name.lastname = name.lastName || 'nothing';

		this.age = age || 'nothing';
		this.gender = gender || 'nothing';
		this.wealth = wealth || 'nothing';
		this.personality = personality || 'nothing';
		//TODO make it so that the voice is based on personality
		this.voice = new Sound('maleApeShort');
	};

	this.name = {
		firstname: null,
		lastname: null,
		getFirst: () => {
			return this.name.firstname;
		},
		getLast: () => {
			return this.name.lastname;
		},
		get: () => {
			if (this.name.firstname != null && this.name.lastname != null) {
				return this.name.firstname + ' ' + this.name.lastname;
			}
		},
		set: (firstname, lastname) => {
			this.name.firstname = firstname;
			this.name.lastname = lastname;
		},
	};
	this.age = null;
	this.gender = null;
	this.wealth = null;
	this.personality = null;

	this.voice = new Sound('maleApeShort');

	this.constructVoicePrefix = () => {
		//replace with this.personality when personality sounds are added
		let personality = 'ape';
		personality = `${personality.slice(0, 1).toUpperCase()}${personality.slice(1, personality.length)}`;
		return `${this.gender === 'f' ? 'female' : 'male'}${personality}`;
	};

	this.playVoiceShort = () => {
		this.voice.pause();
		this.voice.play(`${this.constructVoicePrefix()}Short`);
	};
	this.playVoiceMedium = () => {
		this.voice.pause();
		this.voice.play(`${this.constructVoicePrefix()}Medium`);
	};
	this.playVoiceLong = () => {
		this.voice.pause();
		this.voice.play(`${this.constructVoicePrefix()}Long`);
	};

	this.setAge = age => {
		this.age = age;
	};
	this.getAge = () => {
		return this.age;
	};
	this.setGender = gender => {
		this.gender = gender;
	};
	this.getGender = () => {
		return this.gender;
	};
	this.setWealth = wealth => {
		this.wealth = wealth;
	};
	this.getWealth = () => {
		return this.wealth;
	};
	this.setPersonality = personality => {
		this.personality = personality;
	};
	this.getPersonality = () => {
		return this.personality;
	};
}

export default Person;
