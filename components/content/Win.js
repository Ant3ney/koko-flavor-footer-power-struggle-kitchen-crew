import React from 'react';
import { View } from 'react-native';
import mStats from '../../GameLogic/ManageStats/ManageStats';
import storyLogic from '../../GameLogic/StoryLogic';
import { ActionButton, AppScreen, BodyText, Panel, ScreenHeader, StatCard, ui } from '../uiKit';

function Win(props) {
	return (
		<AppScreen>
			<ScreenHeader
				eyebrow='Outcome'
				title='You Won'
				subtitle='You pushed the power system to the top without letting the kitchen take you down.'
			/>
			<Panel style={styles.panel}>
				<View style={styles.stats}>
					<StatCard label='Result' value='Victory' accent={ui.green} />
					<StatCard label='Power Target' value='10,000' accent={ui.gold} />
				</View>
				<BodyText>
					Keep playing to see the system bend further, or restart the run from the beginning.
				</BodyText>
				<View style={styles.actions}>
					<ActionButton
						title='Start Over'
						variant='secondary'
						onPress={() => {
							mStats.setAlreadyWon(false);
							props.navigation.navigate('Loading Local');

							fetch('https://coco-game-17308.herokuapp.com/testApi/resetData')
								.then(response => response.json())
								.then(data => {
									props.gameLogic.GameDriver.awake(data);

									if (storyLogic.checkForUnhandledStory()) {
										console.log('Initing story');
										storyLogic.fillChapterQueAndChapter();
										console.log('storyLogic.chapterQue.lengrth + ' + storyLogic.getChapterQue().length);
									}

									props.navigation.navigate('Begin Conversation');
								});
						}}
					/>
					<ActionButton title='Keep Playing' onPress={() => props.navigation.navigate('Next Shift Select')} />
				</View>
			</Panel>
		</AppScreen>
	);
}

const styles = {
	panel: {
		gap: 16,
	},
	stats: {
		flexDirection: 'row',
		gap: 12,
	},
	actions: {
		flexDirection: 'row',
		gap: 12,
	},
};

export default Win;
