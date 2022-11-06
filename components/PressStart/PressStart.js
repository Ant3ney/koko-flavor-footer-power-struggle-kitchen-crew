import React, { useEffect, useState } from 'react';
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
					await loadAllAudio(updateLoadingText);
					props.navigation.navigate('Main Menu');
				}}
			/>
		</View>
	);

	function updateLoadingText(soundLoadingContext) {
		const loadingTextEle = document.getElementById('loading-text');
		if (loadingTextEle)
			loadingTextEle.innerHTML = `Loading asset ${soundLoadingContext.currentSound} out of ${soundLoadingContext.max}`;
	}
}

export default PressStart;
