import player from './conversationPlayer';
import beginningTemplete from '../PresetsAndTemplates/ConversationEventTempletes/Begining';

let conversation = {
    awake: (settings) => {
        let type = settings.type;
        conversation.type = type;
        conversation.array = [];
        conversation.setPlayer = settings.setPlayer;

        switch(type){
            case 'normal':
                break;
            case 'beginning':
                conversation.initBegining();
                break;
            case 'win':
                break;
            case 'lose':
                break;
        }
        conversation.start();
        
    },
    start: () => {
        conversation.runThrough();
    },
    close: () => {

    },
    runThrough: () => {
        let conIndex = 0; //conversation.array Index
        let diIndex = 0; //dialog index
        let conversationArray = conversation.array;
        let currentConversation = conversationArray[conIndex](dialogChange, exit, changeBranch).conversation01;
        conversation.updatePlayer(currentConversation[diIndex])
        player.setDialog(currentConversation[diIndex]);
        function dialogChange(){
            diIndex++;
            alert('diIndex = ' + diIndex);
            conversation.updatePlayer(currentConversation[diIndex]);
        }
        function changeBranch(){

        }
        function exit(){

        }
    },
    getPlayer: () => {
        return player;
    },
    initBegining: () => {
        conversation.array.push(beginningTemplete);
    },
    updateCalled: (setPlayer) => {

    },
    updatePlayer: (dialog) => {
        player.setDialog(dialog);
        conversation.setPlayer(player);
    }
}
export default conversation;