function Dialog(character, dialog){
    this.character = character;
    this.dialog = dialog;

    this.setCharacter = (character) => {
        this.character = character;
    }
    this.getCharacter = () => {
        return this.character;
    }
    this.setDialog = (dialog) => {
        this.dialog = dialog;
    }
    this.getDialog = () => {
        return this.dialog;
    }
}

export default Dialog;