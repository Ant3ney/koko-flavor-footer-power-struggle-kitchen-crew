import mStats from '../ManageStats/ManageStats';
import Dialog from '../Conversation/Dialog';
let staticConversation = {};

//TODO: make it so characters in this kickback conversation are based on your current shift characters
var KickbackConversationTempletes = [
	(dialogChanged, finish) => {
		var subJect01Obj = mStats.getRandomCharacter(true);
		var subject01 = subJect01Obj.name.getFirst();

		const shiftCharacters = mStats.getShiftCharacters();

		return {
			conversation01: [
				{
					dialog: new Dialog(subJect01Obj, "That was a good shift don't you think"),
					responses: [
						{
							title: 'Yes',
							onPress: () => {
								dialogChanged();
							},
						},
						{
							title: 'No',
							onPress: () => {
								dialogChanged({
									newConversationProperty: 'conversation02',
									newConIndex: 0,
								});
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
							title: 'Next',
							onPress: () => {
								dialogChanged();
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
								finish();
							},
						},
					],
				},
			],
			conversation02: [
				{
					dialog: new Dialog(subJect01Obj, 'What do you mean! that shift was great!'),
					responses: [
						{
							title: 'Your right.',
							onPress: () => {
								dialogChanged({
									newConversationProperty: 'conversation01',
									newConIndex: 1,
								});
							},
						},
						{
							title: 'No it was shit!',
							onPress: () => {},
						},
					],
				},
				{
					dialog: new Dialog(subJect01Obj, 'The next dialog will bring you back'),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								staticConversation.index = 1;
								staticConversation.currentConversation =
									staticConversation.currentTemplete.conversation01;
								dialogChanged();
							},
						},
					],
				},
			],
		};
	},
];

export default KickbackConversationTempletes;
