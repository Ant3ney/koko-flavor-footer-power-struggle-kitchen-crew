import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { ActionButton, AppScreen, BodyText, Panel, ScreenHeader, StatCard, ui } from './uiKit';

function Settings(props) {
	const navigation = useNavigation();

	return (
		<AppScreen>
			<ScreenHeader eyebrow='System' title='Settings' subtitle='Controls for leaving and returning to the run.'>
				<ActionButton
					title='Back'
					variant='secondary'
					compact
					onPress={() => {
						props.gameLogic.GameDriver.possibleGamePlayReturn(true);
						navigation.goBack();
					}}
				/>
			</ScreenHeader>
			<Panel style={styles.panel}>
				<View style={styles.stats}>
					<StatCard label='State' value='Paused' accent={ui.blue} />
					<StatCard label='Return' value='Ready' accent={ui.green} />
				</View>
				<BodyText>
					The kitchen clock is held while you are here. Return to the shift or leave for the main menu.
				</BodyText>
				<ActionButton title='Main Menu' variant='danger' onPress={() => props.navigation.navigate('Main Menu')} />
			</Panel>
		</AppScreen>
	);
}

const styles = {
	panel: {
		gap: 16,
		maxWidth: 620,
	},
	stats: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
	},
};

export default Settings;
