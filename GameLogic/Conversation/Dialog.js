function Dialog(character, dialog, settings) {
	this.character = character;
	this.dialog = dialog;
	this.settings = settings;
	applyTemporaryAvatar(this.character, this.settings);

	this.setCharacter = character => {
		this.character = character;
		applyTemporaryAvatar(this.character, this.settings);
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

function applyTemporaryAvatar(character, settings) {
	const avatar = settings?.avatar || settings?.tempAvatar || settings?.temporaryAvatar;
	if (!character || !avatar) {
		return;
	}
	if (character.setAvatar) {
		character.setAvatar(avatar);
	} else {
		character.avatar = avatar;
	}
}

function getVoiceLength(dialog) {
	if (dialog.length < 100) return 'Short';
	else if (dialog.length < 200) return 'Medium';
	else if (dialog.length >= 200) return 'Long';
}

export default Dialog;
