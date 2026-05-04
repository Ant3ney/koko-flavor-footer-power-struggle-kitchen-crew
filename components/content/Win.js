import React from 'react';
import { View } from 'react-native';
import mStats from '../../GameLogic/ManageStats/ManageStats';
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
							mStats.resetData(props.gameLogic.GameDriver, props.navigation);
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
		flexWrap: 'wrap',
		gap: 12,
	},
	actions: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
	},
};

export default Win;
