//Make this file as independent as possible
var cMan = {
	isCharacterServer: (character: any) => {
		if (character.character.job === 'server') {
			return true;
		}
		return false;
	},
	isCharacterCook: (character: any) => {
		if (cMan.isCharacterServer(character)) {
			return false;
		}
		return true;
	},
	getCharactersWhosNot: (characters: any, notArray: any) => {
		var characterAry: any = [];
		var name;
		var nameInvalid;
		characters.forEach((character: any, i: number) => {
			name = cMan.getFullName(character);
			nameInvalid = false;

			for (var j = 0; j < notArray.length; j++) {
				if (cMan.getFullName(notArray[j]) === name) {
					nameInvalid = true;
				}
			}

			if (!nameInvalid) {
				characterAry.push(character);
			}
		});

		return characterAry;
	},
	getServersWhosNot: (characters: any, notArray: any) => {
		var avalibleCharacters = cMan.getCharactersWhosNot(characters, notArray);
		var avalibleServers: any = [];

		avalibleCharacters.forEach((character: any, i: number) => {
			if (cMan.isCharacterServer(character)) {
				avalibleServers.push(character);
			}
		});

		return avalibleServers;
	},
	getCooksWhosNot: (characters: any, notArray: any) => {
		var avalibleCharacters = cMan.getCharactersWhosNot(characters, notArray);
		var avalibleCooks: any = [];

		avalibleCharacters.forEach((character: any, i: number) => {
			if (cMan.isCharacterCook(character)) {
				avalibleCooks.push(character);
			}
		});

		return avalibleCooks;
	},
	getFullName: (character: any) => {
		return character.person.name.firstName + ' ' + character.person.name.lastName;
	},
};

export default cMan;
