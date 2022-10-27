import staticConversation from '../../Conversation/staticConversation';
import mStats from '../../ManageStats/ManageStats';
import Dialog from '../../Conversation/Dialog';

let staticConversation = {};

var loseTemplete = (dialogChanged, exit) => {
	var subJect01Obj = mStats.getRandomCharacter();

	return {
		conversation01: [
			{
				dialog: new Dialog(subJect01Obj, 'You lost'),
				responses: [
					{
						title: 'Yes',
						onPress: () => {
							exit();
						},
					},
				],
			},
		],
	};
};

export default loseTemplete;
