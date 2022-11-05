import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import ScenarioKit from '../../GameLogic/Scenario/Scenario';
import basic from '../../Styles/basics';
import scenarioStyle from '../../Styles/scenario';
import { click } from '../../GameLogic/AudioSystem';

var scenario;

function Scenario(props) {
	const [prompt, setPrompt] = useState('Not set');
	const [chose, setChose] = useState(false);
	const [timmer, setTimmer] = useState(0);

	if (!scenario) {
		//Be aware this code will not work as expected if the nav stat holding the Scenario component isint dystroyed
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
		<View
			style={{
				...scenarioStyle.container,
				...basic.makeForground(4),
			}}
		>
			<Text style={basic.textAlignCenter}>{prompt}</Text>
			{!chose ? (
				scenario
					.getButtons()
					.map((button, i) => <Button title={button.title} key={i} onPress={button.onPress} />)
			) : (
				<Button
					title='Acknoladge'
					onPress={() => {
						click();
						scenario.quit();
						scenario = null;
						props.setScenerio(false);
					}}
				/>
			)}
			<Text>Time limit: {timmer}</Text>
		</View>
	);
}

export default Scenario;
