import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import gameDriver from '../../../GameLogic/GameDriver';
import { music } from '../../../GameLogic/AudioSystem';
import storyLogic from '../../../GameLogic/StoryLogic';
import basic from '../../../Styles/basics';
import { click } from '../../../GameLogic/AudioSystem';
import { localStorage } from '../../../utilities';
import getPopulatedUser from './getPopulatedUser';

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
					//In production check server data first.

					//TODO: Change all occurrences of data from fetches to user
					const { user, data } = await getPopulatedUser();

					gameDriver.awake(data);
					gameDriver.giveNavigator(props.navigation);

					//At this point this is a check to see if this is the users first time playing
					/* If true then */
					if (storyLogic.checkForUnhandledStory()) {
						storyLogic.fillChapterQueAndChapter();
					}
					props.navigation.navigate('Play', { type: 'beginning' });
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

async function fetchUser() {
	return new Promise((res, rej) => {
		fetch('https://coco-game-17308.herokuapp.com/testApi/characters')
			.then(response => response.json())
			.then(async data => {
				res(data);
			})
			.catch(console.error);
		console.log();
	});
}

export default MainMenu;
