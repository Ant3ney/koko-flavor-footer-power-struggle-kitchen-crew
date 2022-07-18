//Wraps upp all the gamelogic files into a single object
import GameDriverObjet from "./GameDriver";
import manageStats from "./ManageStats/ManageStats";
import storyLogic from "./StoryLogic";
import conversation from './Conversation/Conversation';

let GameLogic = {
    GameDriver: GameDriverObjet,
    manageStats: manageStats,
    storyLogic: storyLogic,
    conversation: conversation
}

export default GameLogic;