import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import gameDriver from '../../../GameLogic/GameDriver';
import { music } from '../../../GameLogic/AudioSystem';
import storyLogic from '../../../GameLogic/StoryLogic';
import basic from '../../../Styles/basics';
import { click } from '../../../GameLogic/AudioSystem';
import { localStorage } from '../../../utilities';
import getPopulatedUser from './getPopulatedUser';
import initializeGameLogic from './initializeGameLogic';

function MainMenu(props) {
	useEffect(() => {
		music.play('mainTheme', { loop: true, volume: 0.15 });
	}, []);

	return (
		<View style={[basic.centerContainer, basic.bgWhite]}>
			<Text>ココ Flavor Fodder</Text>
			<Button
				title='Play'
				onPress={async () => {
					click();
					props.navigation.navigate('Loading');
					const initDeps = { user: await getPopulatedUser(), props };
					const receipt = initializeGameLogic(initDeps);
					props.navigation.navigate('Play', {
						type: receipt.interoperateUserForBeginning() ? 'beginning' : null,
					});
				}}
			/>

			<Button
				title='Login'
				onPress={() => {
					click();
				}}
			/>

			<Button
				title='Sign up'
				onPress={() => {
					click();
				}}
			/>

			<Button
				title='Share'
				onPress={() => {
					click();
					props.navigation.navigate('Share');
				}}
			/>

			<Button
				title='Leaderbords'
				onPress={() => {
					click();
					props.navigation.navigate('Leaderbords');
				}}
			/>

			<Button
				title='Credits'
				onPress={() => {
					click();
					props.navigation.navigate('Credits');
				}}
			/>

			<Button
				title='Settings'
				onPress={() => {
					click();
					props.navigation.navigate('Settings');
				}}
			/>
		</View>
	);
}

export default MainMenu;
