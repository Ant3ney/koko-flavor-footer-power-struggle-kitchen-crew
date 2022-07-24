import player from './conversationPlayer';
import beginningTemplete from '../PresetsAndTemplates/ConversationEventTempletes/Begining';
import storyLogic from '../StoryLogic';
import storyTempletes from '../PresetsAndTemplates/StoryTempletes';
import KickbackConversationTempletes from '../PresetsAndTemplates/KickbackConversationTempletes';
import { music, click } from '../AudioSystem';

const FIRST_CONVERSATION_PROPERTY = 'conversation01';

let conversation = {
	awake: settings => {
		let type = settings.type || 'normal';
		conversation.type = type;
		conversation.array = [];
		conversation.navigation = settings.navigation;
		conversation.setPlayer = settings.setPlayer;
		console.log('type:', type);

		switch (type) {
			case 'normal':
				//The story case handles kickback conversations and the story conversation
				//TODO: push kickback conversations into conversation array befor story
				storyLogic.fillChapterQueAndChapter();
				console.log('Is in normal');
				let chaptersToPlay = storyLogic.getChapterQue();
				conversation.array.push(KickbackConversationTempletes[0]);
				for (let i = 0; i < chaptersToPlay.length; i++) {
					let templateIndex = chaptersToPlay[i];
					conversation.array.push(storyTempletes[templateIndex]);
				}
				storyLogic.clearChapterQue();
				console.log('conversation.array', conversation.array);
				break;
			case 'beginning':
				music.pause();
				conversation.array.push(beginningTemplete);
				break;
			case 'win':
				break;
			case 'lose':
				break;
		}

		if (conversation.checkIfSafeToPlayConversation()) conversation.start();
		else {
			alert('Internal error: Could not start conversation');
			conversation.navigation.navigate('Next Shift Select');
		}
	},
	start: () => {
		let conIndex = 0; //conversation.array Index
		let diIndex = 0; //dialog index
		let conversationArray = conversation.array;
		let currentConversation = conversationArray[conIndex](dialogChange, finish)[FIRST_CONVERSATION_PROPERTY];
		conversation.updatePlayer(currentConversation[diIndex]);
		player.setDialog(currentConversation[diIndex]);
		function dialogChange() {
			click();
			diIndex++;
			conversation.updatePlayer(currentConversation[diIndex]);
		}
		function finish() {
			click();
			conIndex++;
			diIndex = 0;
			console.log('Finish report', conIndex, conversationArray.length);
			if (conIndex >= conversationArray.length) {
				conversation.navigation.navigate('Next Shift Select');
			} else {
				currentConversation = conversationArray[conIndex](dialogChange, finish)[FIRST_CONVERSATION_PROPERTY];
				conversation.updatePlayer(currentConversation[diIndex]);
			}
		}
	},
	close: () => {},
	getPlayer: () => {
		return player;
	},
	updateCalled: setPlayer => {},
	updatePlayer: dialog => {
		player.setDialog(dialog);
		conversation.setPlayer(player);
	},
	checkIfSafeToPlayConversation: () => {
		let check = false;
		try {
			check = conversation?.array && typeof conversation.array[0] === 'function';
		} catch (e) {
			console.log(e);
		}
		return check;
	},
};
export default conversation;
