import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

import basic from '../../../Styles/basics';
import Character from './Character';

import { click } from '../../../GameLogic/AudioSystem';

function Screen(props) {
	const [schedule, setSchedule] = useState([]);

	useEffect(() => {
		if (props) {
			setSchedule(props.schedule);
		}
	}, []);

	return (
		<View
			style={{
				...basic.makeForground(1),
				...basic.fullFluidContainer,
				...basic.bgStandard,
				...{
					marginTop: 20,
					marginBottom: 20,
				},
			}}
		>
			<Text>{props.day.toString().slice(0, 1).toUpperCase() + props.day.toString().slice(1)}'s schedule</Text>
			{schedule.map((characterInfo, i) => (
				<Character characterInfo={characterInfo} key={i} />
			))}
			<Button
				title='Back'
				onPress={() => {
					click();
					props.exitSchedual();
				}}
			/>
		</View>
	);
}

export default Screen;
