import Sound from '../AudioSystem/Sound';

function Person() {
	//only in this constructor can the varibles be edited without the use of healper functions

	this.personInit = (name, age, gender, wealth, personality, deniedPhrase, catchPhrase) => {
		//In future, test out and see witch varibles can be private declaring them thisfunction.varible name. Maby a namelike this.private.name for something.

		this.name.firstname = name.firstName || 'nothing';
		this.name.lastname = name.lastName || 'nothing';

		this.age = age || 'nothing';
		this.gender = gender || 'nothing';
		this.wealth = wealth || 'nothing';
		this.personality = personality || 'nothing';
		this.deniedPhrase = deniedPhrase || 'nothing';
		this.catchPhrase = catchPhrase || 'nothing';
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

	this.constructVoicePrefix = emotion => {
		//replace with this.personality when personality sounds are added

		return `${this.gender === 'f' ? 'female' : 'male'}${personality}`;
	};

	this.playVoice = (emotion = 'Neutral', length = 'Short') => {
		const personality = this.personality
			? `${this.personality.slice(0, 1).toUpperCase()}${this.personality.slice(1, this.personality.length)}`
			: 'Consistent';
		const gender = this.gender === 'f' ? 'female' : 'male';
		this.voice.pause();
		this.voice.play(`${gender}${personality}${emotion}${length}`);
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
	this.getDeniedPhrase = () => {
		return this.deniedPhrase;
	};
	this.setDeniedPhrase = deniedPhrase => {
		this.deniedPhrase = deniedPhrase;
	};
	this.getCatchPhrase = () => {
		return this.catchPhrase;
	};
	this.setCatchPhrase = catchPhrase => {
		this.catchPhrase = catchPhrase;
	};
}

export default Person;
