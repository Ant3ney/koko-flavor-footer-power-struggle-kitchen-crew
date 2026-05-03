import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import ScenarioKit from '../../GameLogic/Scenario/Scenario';
import { click } from '../../GameLogic/AudioSystem';
import { ActionButton, BodyText, Eyebrow, Panel, ui } from '../uiKit';

var scenario;

function Scenario(props) {
	const [prompt, setPrompt] = useState('Not set');
	const [chose, setChose] = useState(false);
	const [timmer, setTimmer] = useState(0);

	if (!scenario) {
		scenario = new ScenarioKit();
	}

	useEffect(() => {
		setTimmer(scenario.getCurrentTime());
		setPrompt(scenario.getPrompt());
		scenario.onButtonPress(() => {
			setPrompt(scenario.getPrompt());
			scenario.stopTime();
			setChose(true);
		});

		scenario.onTic(time => {
			setTimmer(time);
		});

		scenario.onTimeout(() => {
			setPrompt(scenario.getPrompt());
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
				<BodyText style={styles.prompt}>{prompt}</BodyText>
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
		padding: 24,
	},
	modal: {
		width: '100%',
		maxWidth: 760,
		gap: 18,
		borderColor: ui.red,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 12,
	},
	title: {
		color: ui.ink,
		fontSize: 30,
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
	prompt: {
		fontSize: 19,
		lineHeight: 28,
		color: ui.ink,
	},
	actions: {
		gap: 10,
	},
};

export default Scenario;
