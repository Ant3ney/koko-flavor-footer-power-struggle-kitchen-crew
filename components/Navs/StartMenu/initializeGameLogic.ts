import storyLogic from '../../../GameLogic/StoryLogic';
import gameDriverModule from '../../../GameLogic/GameDriver';

const initializeGameLogic = (initDeps: any) => {
	const gameDriver = gameDriverModule as any;
	const { user, props } = initDeps;
	gameDriver.awake(user);
	if (!gameDriver?.giveNavigator) return;
	gameDriver.giveNavigator(props.navigation);

	if (storyLogic.checkForUnhandledStory()) {
		storyLogic.fillChapterQueAndChapter();
	}

	return {
		interoperateUserForBeginning: () =>
			user?.testPlayer &&
			user.currentDay === 'monday' &&
			user.initialChapter === 0 &&
			user.testPlayer.power === 50,
	};
};

export default initializeGameLogic;
