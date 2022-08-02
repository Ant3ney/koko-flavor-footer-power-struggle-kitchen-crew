function Dialog(character, dialog) {
	this.character = character;
	this.dialog = dialog;
	this.voice = {
		isShort: dialog.length < 20,
		isMedium: dialog.length < 150,
		isLong: dialog.length >= 150,
	};

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
		const { isShort, isMedium } = this.voice;
		if (isShort) this.character.playVoiceShort();
		else if (isMedium) this.character.playVoiceMedium();
		else this.character.playVoiceLong();
	};
	this.getDialog = () => {
		return this.dialog;
	};
}

export default Dialog;
