import player from './conversationPlayer';
import beginningTemplete from '../PresetsAndTemplates/ConversationEventTempletes/Begining';
import storyLogic from '../StoryLogic';
import storyTempletes from '../PresetsAndTemplates/StoryTempletes';
import KickbackConversationTempletes from '../PresetsAndTemplates/KickbackConversationTempletes';
import { music, click } from '../AudioSystem';
import mStats from '../ManageStats/ManageStats';
import loseTemplete from '../PresetsAndTemplates/ConversationEventTempletes/Lose';
import gameDriver from '../GameDriver/GameDriver';

const FIRST_CONVERSATION_PROPERTY = 'conversation01';

let conversation = {
	awake: settings => {
		let type = settings.type || 'normal';
		console.log('conversation type:', type, '\nSettings:', settings);
		conversation.type = type;
		conversation.array = [];
		conversation.navigation = settings.navigation;
		conversation.setPlayer = settings.setPlayer;

		switch (type) {
			case 'normal':
				//The normal case handles kickback conversations and the story conversations
				storyLogic.fillChapterQueAndChapter();
				let chaptersToPlay = storyLogic.getChapterQue();
				conversation.array.push(KickbackConversationTempletes[0]);
				for (let i = 0; i < chaptersToPlay.length; i++) {
					let templateIndex = chaptersToPlay[i];
					conversation.array.push(storyTempletes[templateIndex]);
				}
				storyLogic.clearChapterQue();
				break;
			case 'beginning':
				music.pause();
				conversation.array.push(beginningTemplete);
				break;
			case 'win':
				break;
			case 'lose':
				conversation.array.push(loseTemplete);
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
		function dialogChange(changedBranch) {
			if (changedBranch) {
				const { newConversationProperty, newConIndex } = changedBranch;
				currentConversation = conversationArray[conIndex](dialogChange, finish)[newConversationProperty];
				diIndex = newConIndex || 0;
			} else diIndex++;
			click();
			conversation.updatePlayer(currentConversation[diIndex]);
		}
		function finish() {
			click();
			conIndex++;
			diIndex = 0;
			if (conversation.type === 'lose') {
				mStats.resetData(gameDriver);
				return;
			}
			if (conIndex >= conversationArray.length) {
				//TODO Save user data here
				conversation.navigation.push('Next Shift Select');
			} else {
				console.log('changed to another element');
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
		player.playVoice();
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
