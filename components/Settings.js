import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { ActionButton, AppScreen, BodyText, Eyebrow, Panel, ScreenHeader, StatCard, ui } from './uiKit';

function Settings(props) {
	const navigation = useNavigation();

	return (
		<AppScreen>
			<ScreenHeader eyebrow='System' title='Menu' subtitle='Controls for leaving, returning, and reading the shift rules.'>
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
				<View style={styles.tutorial}>
					<Eyebrow>Tutorial</Eyebrow>
					<BodyText>You lose when your power is below 100, or if someone besides you reaches 8500 power.</BodyText>
					<BodyText>You win if you reach 8500 power.</BodyText>
					<BodyText>
						Each tic, you gain power or lose power depending on how much station effectiveness you have.
					</BodyText>
					<BodyText>Over time, you naturally get more station effectiveness.</BodyText>
					<BodyText>
						Busyness determines how much station effectiveness you gain or lose per tic.
					</BodyText>
					<BodyText>Hustling increases your station effectiveness at the cost of 1 energy.</BodyText>
				</View>
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
	tutorial: {
		backgroundColor: '#FFF4DD',
		borderWidth: 1,
		borderColor: '#FFDCA4',
		padding: 12,
		gap: 8,
	},
};

export default Settings;
