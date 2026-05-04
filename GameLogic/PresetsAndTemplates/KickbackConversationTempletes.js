import mStats from '../ManageStats/ManageStats';
import Dialog from '../Conversation/Dialog';
let conversationContext = {
	started: false,
};
let powerTauntContext = {
	started: false,
};
let closeCallContext = {
	started: false,
};
let crewMurmurContext = {
	started: false,
};
let stationPraiseContext = {
	started: false,
};
const a = { emotion: 'Angry' };
const h = { emotion: 'Happy' };
const n = { emotion: 'Neutral' };

export function getKickbackConversationTemplete() {
	var availableTempletes = KickbackConversationTempletes.filter(templete => {
		return !templete.canPlay || templete.canPlay();
	});
	var randomIndex = Math.floor(Math.random() * availableTempletes.length);
	return availableTempletes[randomIndex] || KickbackConversationTempletes[0];
}

function getMostPowerfulShiftCharacterAbovePlayer() {
	var playerPower = mStats.getPPower();
	var strongestCharacter = null;
	(mStats.getShiftCharacters() || []).forEach(character => {
		if (!character || !character.getPower || character.getPower() <= playerPower) {
			return;
		}
		if (!strongestCharacter || character.getPower() > strongestCharacter.getPower()) {
			strongestCharacter = character;
		}
	});
	return strongestCharacter;
}

function resetKickbackContexts() {
	conversationContext.started = false;
	powerTauntContext.started = false;
	closeCallContext.started = false;
	crewMurmurContext.started = false;
	stationPraiseContext.started = false;
}

var defaultKickbackConversation = (dialogChanged, finish) => {
	//TODO: Make a more proper streamlined version of this.
	//Consider creating file that specializes in what conversationContext achieves
	var subJect01Obj = mStats.getRandomCharacter(true);
	if (conversationContext.started) subJect01Obj = conversationContext.subJect01Obj;
	conversationContext.subJect01Obj = subJect01Obj;
	conversationContext.started = true;

	return {
		conversation01: [
			{
				dialog: new Dialog(subJect01Obj, "That was a good shift don't you think"),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(subJect01Obj, "I'm glad you agree"),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(subJect01Obj, 'It looks like your going to become a very powerful employee.'),
				responses: [
					{
						title: 'Take the compliment',
						onPress: () => {
							mStats.addPPower(15);
							dialogChanged({ newConversationProperty: 'acceptCompliment', newConIndex: 0 });
						},
					},
					{
						title: 'Play it cool',
						onPress: () => {
							dialogChanged({ newConversationProperty: 'playItCool', newConIndex: 0 });
						},
					},
				],
			},
			{
				dialog: new Dialog(subJect01Obj, 'Anyway, goodbye.'),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							resetKickbackContexts();
							finish();
						},
					},
				],
			},
		],
		acceptCompliment: [
			{
				dialog: new Dialog(subJect01Obj, 'That confidence looks good on you. Keep building it.'),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							resetKickbackContexts();
							finish();
						},
					},
				],
			},
		],
		playItCool: [
			{
				dialog: new Dialog(subJect01Obj, 'Quiet confidence, huh? Fine. Just make sure the numbers keep backing it up.'),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							resetKickbackContexts();
							finish();
						},
					},
				],
			},
		],
	};
};

var powerTauntKickbackConversation = (dialogChanged, finish) => {
	var subjectObj = getMostPowerfulShiftCharacterAbovePlayer();
	if (powerTauntContext.started) subjectObj = powerTauntContext.subjectObj;
	powerTauntContext.subjectObj = subjectObj;
	powerTauntContext.started = true;

	var playerPower = mStats.getPPower();
	var subjectPower = subjectObj.getPower();
	var powerDifference = subjectPower - playerPower;

	return {
		conversation01: [
			{
				dialog: new Dialog(subjectObj, 'That shift felt pretty good for me. I hope you noticed.', h),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(
					subjectObj,
					'I mean, look at the numbers. I am sitting at ' +
						subjectPower +
						' power. You are sitting at ' +
						playerPower +
						'. That is not even close.',
					h
				),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(
					subjectObj,
					'That puts me ' +
						powerDifference +
						' power above you. I do not know if you understand how bad that looks for you.',
					a
				),
				responses: [
					{
						title: 'Bite back',
						onPress: () => {
							mStats.addPPower(20);
							dialogChanged({ newConversationProperty: 'biteBack', newConIndex: 0 });
						},
					},
					{
						title: 'Stay quiet',
						onPress: () => {
							dialogChanged({ newConversationProperty: 'stayQuiet', newConIndex: 0 });
						},
					},
				],
			},
			{
				dialog: new Dialog(
					subjectObj,
					'I just outworked you, outpowered you, and walked out of the shift above you. Get your power up before you stand next to me like an equal.',
					h
				),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							resetKickbackContexts();
							finish();
						},
					},
				],
			},
		],
		biteBack: [
			{
				dialog: new Dialog(
					subjectObj,
					'There it is. A little spark. Still not enough power, but at least you are not folding completely.',
					a
				),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							resetKickbackContexts();
							finish();
						},
					},
				],
			},
		],
		stayQuiet: [
			{
				dialog: new Dialog(
					subjectObj,
					'Nothing to say? Good. Maybe the gap is finally teaching you something.',
					h
				),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							resetKickbackContexts();
							finish();
						},
					},
				],
			},
		],
	};
};

powerTauntKickbackConversation.canPlay = () => {
	return !!getMostPowerfulShiftCharacterAbovePlayer();
};

var closeCallKickbackConversation = (dialogChanged, finish) => {
	var subjectObj = mStats.getRandomCharacter(true);
	if (closeCallContext.started) subjectObj = closeCallContext.subjectObj;
	closeCallContext.subjectObj = subjectObj;
	closeCallContext.started = true;

	var playerPower = mStats.getPPower();
	var subjectPower = subjectObj.getPower();
	var gap = Math.abs(playerPower - subjectPower);

	return {
		conversation01: [
			{
				dialog: new Dialog(
					subjectObj,
					'I checked the shift numbers. You and I are closer than I thought.',
					n
				),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(
					subjectObj,
					'You have ' +
						playerPower +
						' power. I have ' +
						subjectPower +
						'. That is only a ' +
						gap +
						' power difference.',
					n
				),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(
					subjectObj,
					'I do not like that. People start acting brave when the gap gets small.',
					a
				),
				responses: [
					{
						title: 'Act brave',
						onPress: () => {
							mStats.addPPower(10);
							dialogChanged({ newConversationProperty: 'actBrave', newConIndex: 0 });
						},
					},
					{
						title: 'Keep your head down',
						onPress: () => {
							dialogChanged({ newConversationProperty: 'headDown', newConIndex: 0 });
						},
					},
				],
			},
		],
		actBrave: [
			{
				dialog: new Dialog(subjectObj, 'That is what I was worried about. Do not let one close number turn into a big mouth.', a),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							resetKickbackContexts();
							finish();
						},
					},
				],
			},
		],
		headDown: [
			{
				dialog: new Dialog(subjectObj, 'Smart. Keep working before you start talking.', n),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							resetKickbackContexts();
							finish();
						},
					},
				],
			},
		],
	};
};

closeCallKickbackConversation.canPlay = () => {
	var shiftCharacters = mStats.getShiftCharacters() || [];
	var playerPower = mStats.getPPower();
	return shiftCharacters.some(character => {
		if (!character || !character.getPower) {
			return false;
		}
		var gap = Math.abs(playerPower - character.getPower());
		return gap > 0 && gap <= 250;
	});
};

var crewMurmurKickbackConversation = (dialogChanged, finish) => {
	var subjectObj = getMostPowerfulShiftCharacterAbovePlayer() || mStats.getRandomCharacter(true);
	if (crewMurmurContext.started) subjectObj = crewMurmurContext.subjectObj;
	crewMurmurContext.subjectObj = subjectObj;
	crewMurmurContext.started = true;

	return {
		conversation01: [
			{
				dialog: new Dialog(
					subjectObj,
					'You hear that after the shift? People are talking about who actually carried today.',
					n
				),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(
					subjectObj,
					'I heard my name more than yours. That is how power moves around here. Not all at once. Just little whispers after everyone clocks out.',
					h
				),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(
					subjectObj,
					'Careful. A few more shifts like that and people start deciding who matters before you even walk in.',
					a
				),
				responses: [
					{
						title: 'Ask who said that',
						onPress: () => {
							dialogChanged({ newConversationProperty: 'askWho', newConIndex: 0 });
						},
					},
					{
						title: 'Ignore the whispers',
						onPress: () => {
							mStats.addPPower(5);
							dialogChanged({ newConversationProperty: 'ignoreWhispers', newConIndex: 0 });
						},
					},
				],
			},
		],
		askWho: [
			{
				dialog: new Dialog(subjectObj, 'That is the problem. You do not get names. You just feel the room turning.', a),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							resetKickbackContexts();
							finish();
						},
					},
				],
			},
		],
		ignoreWhispers: [
			{
				dialog: new Dialog(subjectObj, 'Maybe that is the right move. Power does not always answer gossip out loud.', n),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							resetKickbackContexts();
							finish();
						},
					},
				],
			},
		],
	};
};

crewMurmurKickbackConversation.canPlay = () => {
	return !!getMostPowerfulShiftCharacterAbovePlayer();
};

var stationPraiseKickbackConversation = (dialogChanged, finish) => {
	var subjectObj = mStats.getRandomCharacter(true);
	if (stationPraiseContext.started) subjectObj = stationPraiseContext.subjectObj;
	stationPraiseContext.subjectObj = subjectObj;
	stationPraiseContext.started = true;

	var stationEffectivness = mStats.getPEffectivness();

	return {
		conversation01: [
			{
				dialog: new Dialog(
					subjectObj,
					'I will give you this much. Your station did not completely collapse today.',
					n
				),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(
					subjectObj,
					'Your station effectiveness ended at ' +
						stationEffectivness +
						'. That is not legendary, but it is not embarrassing either.',
					h
				),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(
					subjectObj,
					'Do not get comfortable though. Around here, one clean shift just makes everyone watch the next one harder.',
					a
				),
				responses: [
					{
						title: 'Accept the warning',
						onPress: () => {
							mStats.addPPower(10);
							dialogChanged({ newConversationProperty: 'acceptWarning', newConIndex: 0 });
						},
					},
					{
						title: 'Brush it off',
						onPress: () => {
							dialogChanged({ newConversationProperty: 'brushOffWarning', newConIndex: 0 });
						},
					},
				],
			},
		],
		acceptWarning: [
			{
				dialog: new Dialog(subjectObj, 'Good. Stay alert. The station only respects people who keep proving it.', h),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							resetKickbackContexts();
							finish();
						},
					},
				],
			},
		],
		brushOffWarning: [
			{
				dialog: new Dialog(subjectObj, 'Brush it off if you want. The kitchen loves catching people who relax too early.', a),
				responses: [
					{
						title: 'Next',
						onPress: () => {
							resetKickbackContexts();
							finish();
						},
					},
				],
			},
		],
	};
};

var KickbackConversationTempletes = [
	defaultKickbackConversation,
	powerTauntKickbackConversation,
	closeCallKickbackConversation,
	crewMurmurKickbackConversation,
	stationPraiseKickbackConversation,
];

export default KickbackConversationTempletes;
