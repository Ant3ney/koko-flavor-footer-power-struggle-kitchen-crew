import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import pressStartStyle from '../../Styles/pressStart';
import { click } from '../../GameLogic/AudioSystem';
import loadAllAudio from './loadAllAudio';

function PressStart(props) {
	return (
		<View style={pressStartStyle.container}>
			<Text>PressStart</Text>
			<Button
				title='Start'
				onPress={async () => {
					click();
					props.navigation.navigate('Loading');
					await loadAllAudio();
					props.navigation.navigate('Main Menu');
				}}
			/>
		</View>
	);
}

export default PressStart;
