let player = {
	setDialog: dialog => {
		player.dialogHolder = dialog;
		player.dialogObj = dialog.dialog;
		player.name = getConversationNameFromDialog(player.dialogObj);
		player.diaLogText = player.dialogObj.getDialog();

		player.setResponses(dialog.responses);
	},
	setResponses: responses => {
		player.responses = responses;
	},
	getName: () => {
		return getConversationNameFromDialog(player.dialogObj);
	},
	getDialog: () => {
		return player?.dialogObj?.getDialog();
	},
	getResponses: () => {
		return player.responses;
	},
};

function getConversationNameFromDialog(dialog) {
	if (!dialog) return null;
	return dialog.getCharacter().name.getLast().length > 0
		? dialog.getCharacter().name.get()
		: dialog.getCharacter().name.getFirst();
}

export default player;
