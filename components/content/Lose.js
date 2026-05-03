import React from 'react';
import { View } from 'react-native';
import { ActionButton, AppScreen, BodyText, Panel, ScreenHeader, StatCard, ui } from '../uiKit';

function Lose(props) {
	var mStats = props.gameLogic.manageStats;
	var storyLogic = props.gameLogic.storyLogic;

	return (
		<AppScreen>
			<ScreenHeader
				eyebrow='Outcome'
				title='You Lost'
				subtitle='The kitchen power structure overtook your run. Reset the system and try again.'
			/>
			<Panel style={styles.panel}>
				<View style={styles.stats}>
					<StatCard label='Result' value='Loss' accent={ui.red} />
					<StatCard label='Threat' value='Power Gap' accent={ui.orangeDeep} />
				</View>
				<BodyText>
					A stronger employee or a collapsing sanity loop can end the run. Start over to rebuild from the
					first shift.
				</BodyText>
				<ActionButton
					title='Start Over'
					variant='danger'
					onPress={() => {
						mStats.setAlreadyWon(false);
						props.navigation.navigate('Loading Local');

						fetch('https://coco-game-17308.herokuapp.com/testApi/resetData')
							.then(response => response.json())
							.then(data => {
								props.gameLogic.GameDriver.awake(data);
								props.gameLogic.staticConversation.procBegining(true);
								if (storyLogic.checkForUnhandledStory()) {
									console.log('Initing story');
									storyLogic.fillChapterQueAndChapter();
								}

								props.navigation.navigate('Begin Conversation');
							});
					}}
				/>
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
};

export default Lose;
