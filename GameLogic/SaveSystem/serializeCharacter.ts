//The data structure of a character is different depending on weather it
//Is saved in game or by local storage.
export default function serializeCharacter(character: any, type?: string) {
	switch (type) {
		case 'flat':
			return { ...character, voice: null };
		default:
			return {
				person: {
					name: {
						firstName: character.name.getFirst(),
						lastName: character.name.getLast(),
					},
					age: character.getAge(),
					gender: character.getGender(),
					wealth: character.getWealth(),
					personality: character.getPersonality(),
					deniedPhrase: character.getDeniedPhrase(),
					catchPhrase: character.getCatchPhrase(),
				},
				character: {
					power: character.getPower(),
					skill: character.getSkill(),
					skillPoints: character.getSkillPoints(),
					currentStation: character.getCurrentStation(),
					job: character.getJob(),
					effectivness: character.getEffectivness(),
					sanity: character.getSanity(),
					respectability: character.getRespectability(),
					happyness: character.getHappyness(),
					cleanliness: character.getCleanliness(),
					anger: character.getAnger(),
				},
			};
	}
}
