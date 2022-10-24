function Dialog(character, dialog, settings) {
	this.character = character;
	this.dialog = dialog;
	this.settings = settings;

	this.setCharacter = character => {
		this.character = character;
	};
	this.getCharacter = () => {
		return this.character;
	};
	this.setDialog = dialog => {
		this.dialog = dialog;
	};
	this.playVoice = () => {
		const voiceLength = getVoiceLength(dialog);
		const { emotion } = settings || {};
		this.character.playVoice(emotion, voiceLength);
	};
	this.getDialog = () => {
		return this.dialog;
	};
}

function getVoiceLength(dialog) {
	if (dialog.length < 100) return 'Short';
	else if (dialog.length < 200) return 'Medium';
	else if (dialog.length >= 200) return 'Long';
}

export default Dialog;
