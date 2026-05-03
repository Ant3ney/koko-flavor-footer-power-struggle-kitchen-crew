import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { ActionButton, AppScreen, BodyText, Eyebrow, Panel, ScreenHeader, Title } from './uiKit';

const credits = [
	'Game Director: Anthony Cavuoti',
	'Voice Actor: delaneygilmour from fiverr',
	'Voice Actor: thegreattoddman from fiverr',
	'Voice Actor: cessinistas from fiverr',
	'Voice Actor: huskycommander from fiverr',
	'Voice Actor: Jannik Baur',
	'Voice Actor: Victor',
	'Voice Actor: Taylor Sanchez',
	'Voice Actor: Nathan',
	'Voice Actor: Dante Ayala',
	'Music: Joseph and the Amazing Technicolor Dreamcoat',
	'Music transposition: Anthony Cavuoti',
	'Scenario Consultant: Brad Yanagi',
];

export default function Credits(props) {
	const navigation = useNavigation();

	return (
		<AppScreen scroll>
			<ScreenHeader
				eyebrow='Production'
				title='Credits'
				subtitle='The voices, music, and scenario support behind the kitchen pressure system.'
			>
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
			<Panel style={styles.list}>
				<Eyebrow>Team Roll</Eyebrow>
				<Title size={26}>Built by a focused crew</Title>
				<View style={styles.creditGrid}>
					{credits.map((credit, index) => (
						<View key={index} style={styles.creditItem}>
							<BodyText>{credit}</BodyText>
						</View>
					))}
				</View>
			</Panel>
		</AppScreen>
	);
}

const styles = {
	list: {
		gap: 16,
	},
	creditGrid: {
		gap: 10,
		marginTop: 10,
	},
	creditItem: {
		backgroundColor: '#FFF4DD',
		borderWidth: 1,
		borderColor: '#FFDCA4',
		paddingHorizontal: 14,
		paddingVertical: 12,
	},
};
