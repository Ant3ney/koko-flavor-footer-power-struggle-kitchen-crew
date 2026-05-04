import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import ScenarioKit from '../../GameLogic/Scenario/Scenario';
import { click } from '../../GameLogic/AudioSystem';
import { ActionButton, BodyText, Eyebrow, Panel, ui } from '../uiKit';
import { getAvatarImage } from './avatarImages';
import CharacterBioButton from './CharacterBio';

var scenario;
const placeholderScenarioImage = require('../../assets/scenarios/scenarios_placeholder.png');

function Scenario(props) {
	const [prompt, setPrompt] = useState('Not set');
	const [chose, setChose] = useState(false);
	const [timmer, setTimmer] = useState(0);
	const [characters, setCharacters] = useState([]);
	const [characterChanges, setCharacterChanges] = useState([]);
	const [scenarioImage, setScenarioImage] = useState(placeholderScenarioImage);

	if (!scenario) {
		scenario = new ScenarioKit();
	}

	useEffect(() => {
		setTimmer(scenario.getCurrentTime());
		setPrompt(scenario.getPrompt());
		setCharacters(scenario.getInvolvedCharacters());
		setScenarioImage(scenario.getImage());
		scenario.onButtonPress(() => {
			setPrompt(scenario.getPrompt());
			setCharacterChanges(scenario.getCharacterStatChanges());
			scenario.stopTime();
			setChose(true);
		});

		scenario.onTic(time => {
			setTimmer(time);
		});

		scenario.onTimeout(() => {
			setPrompt(scenario.getPrompt());
			setCharacterChanges(scenario.getCharacterStatChanges());
			setChose(true);
		});
	}, []);

	return (
		<View style={styles.overlay}>
			<Panel style={styles.modal}>
				<View style={styles.header}>
					<View>
						<Eyebrow>Scenario Interrupt</Eyebrow>
						<Text style={styles.title}>Decision Required</Text>
					</View>
					<View style={styles.timer}>
						<Text style={styles.timerLabel}>TIME</Text>
						<Text style={styles.timerValue}>{timmer}</Text>
					</View>
				</View>
				<ScrollView style={styles.contentScroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator>
					<Image source={scenarioImage} style={styles.scenarioImage} resizeMode='contain' />
					<CharacterRoster characters={characters} />
					<BodyText style={styles.prompt}>{prompt}</BodyText>
					{chose ? <CharacterChanges changes={characterChanges} /> : null}
				</ScrollView>
				<View style={styles.actions}>
					{!chose ? (
						scenario.getButtons().map((button, i) => (
							<ActionButton key={i} title={button.title} onPress={button.onPress} />
						))
					) : (
						<ActionButton
							title='Acknowledge'
							variant='secondary'
							onPress={() => {
								click();
								scenario.quit();
								scenario = null;
								props.setScenerio(false);
							}}
						/>
					)}
				</View>
			</Panel>
		</View>
	);
}

function CharacterRoster({ characters }) {
	if (!characters.length) {
		return null;
	}
	return (
		<View style={styles.characterRoster}>
			{characters.map((character, i) => (
				<View key={getCharacterName(character) + i} style={styles.characterCard}>
					{getAvatarImage(character) ? (
						<Image source={getAvatarImage(character)} style={styles.avatar} resizeMode='cover' />
					) : (
						<View style={styles.avatarFallback}>
							<Text style={styles.avatarFallbackText}>{getInitials(character)}</Text>
						</View>
					)}
					<View style={styles.characterCopy}>
						<Text style={styles.characterName}>{getCharacterName(character)}</Text>
						<Text style={styles.characterRole}>{getCharacterRole(character)}</Text>
					</View>
					<CharacterBioButton character={character} compact />
				</View>
			))}
		</View>
	);
}

function CharacterChanges({ changes }) {
	if (!changes.length) {
		return null;
	}
	return (
		<View style={styles.changePanel}>
			<Text style={styles.changeTitle}>Character changes</Text>
			{changes.map((change, i) => (
				<Text key={i} style={styles.changeText}>
					{getCharacterName(change.character)} {formatStatName(change.stat)} {change.amount > 0 ? '+' : ''}
					{change.amount}
				</Text>
			))}
		</View>
	);
}

function getCharacterName(character) {
	if (!character) {
		return 'Unknown';
	}
	if (character.name && character.name.get) {
		return character.name.get();
	}
	return character.name || 'Unknown';
}

function getCharacterRole(character) {
	if (character?.role) {
		return character.role;
	}
	if (character?.getJob) {
		return character.getJob();
	}
	return 'Crew';
}

function getInitials(character) {
	var name = getCharacterName(character);
	return name
		.split(' ')
		.map(part => part.slice(0, 1))
		.join('')
		.slice(0, 2)
		.toUpperCase();
}

function formatStatName(stat) {
	if (stat === 'effectivness') {
		return 'effectiveness';
	}
	return stat;
}

const styles = {
	overlay: {
		position: 'absolute',
		zIndex: 4,
		elevation: 4,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(36, 18, 12, 0.38)',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 12,
	},
	modal: {
		width: '100%',
		maxWidth: 760,
		maxHeight: '92%',
		gap: 12,
		borderColor: ui.red,
	},
	header: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 12,
	},
	title: {
		color: ui.ink,
		fontSize: 26,
		fontWeight: '900',
	},
	timer: {
		minWidth: 92,
		backgroundColor: ui.red,
		paddingHorizontal: 14,
		paddingVertical: 10,
		alignItems: 'center',
	},
	timerLabel: {
		color: '#FFDCA4',
		fontSize: 10,
		fontWeight: '900',
	},
	timerValue: {
		color: ui.white,
		fontSize: 24,
		fontWeight: '900',
	},
	contentScroll: {
		flexShrink: 1,
	},
	content: {
		gap: 12,
		paddingRight: 4,
	},
	scenarioImage: {
		width: '100%',
		aspectRatio: 1465 / 1074,
		maxHeight: 300,
		backgroundColor: '#FFF4DD',
		borderWidth: 1,
		borderColor: '#FFDCA4',
	},
	characterRoster: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10,
	},
	characterCard: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: 10,
		minWidth: 0,
		flexGrow: 1,
		backgroundColor: '#FFF4DD',
		borderWidth: 1,
		borderColor: '#FFDCA4',
		padding: 8,
	},
	avatar: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: '#FFDCA4',
	},
	avatarFallback: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: ui.ink,
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatarFallbackText: {
		color: ui.white,
		fontSize: 14,
		fontWeight: '900',
	},
	characterCopy: {
		flex: 1,
		minWidth: 0,
	},
	characterName: {
		color: ui.ink,
		fontSize: 14,
		fontWeight: '900',
	},
	characterRole: {
		color: ui.brown,
		fontSize: 11,
		fontWeight: '900',
		textTransform: 'uppercase',
	},
	prompt: {
		fontSize: 19,
		lineHeight: 28,
		color: ui.ink,
	},
	changePanel: {
		backgroundColor: '#FFF4DD',
		borderWidth: 1,
		borderColor: '#FFDCA4',
		padding: 12,
		gap: 6,
	},
	changeTitle: {
		color: ui.ink,
		fontSize: 13,
		fontWeight: '900',
		textTransform: 'uppercase',
	},
	changeText: {
		color: ui.brown,
		fontSize: 14,
		fontWeight: '800',
	},
	actions: {
		flexShrink: 0,
		gap: 10,
	},
};

export default Scenario;
