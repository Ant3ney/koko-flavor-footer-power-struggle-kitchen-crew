import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import gameDriver from '../../GameLogic/GameDriver';
import { music } from '../../GameLogic/AudioSystem';
import storyLogic from '../../GameLogic/StoryLogic';
import basic from '../../Styles/basics';
import { click } from '../../GameLogic/AudioSystem';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MainMenu(props) {
	useEffect(() => {
		music.play('mainTheme', { loop: true, volume: 0.15 });
	}, []);

	return (
		<View style={[basic.centerContainer, basic.bgWhite]}>
			<Text>ココ Flavor Fodder</Text>
			<Button
				title='Play'
				onPress={() => {
					click();
					props.navigation.navigate('Loading');

					//Check to se if local data is avalible.
					//TODO: factor out loading data code into sperate file
					const userJSON = window.local;
					//If not use server data.
					//In production check server data first.

					fetch('https://coco-game-17308.herokuapp.com/testApi/characters')
						.then(response => response.json())
						.then(async data => {
							//While the local storage solution is in development. local storage code will happeon here.
							const JSONUser = await AsyncStorage.getItem('user');

							//Yes. there is a discrepency between the name for data and user.
							//TODO: Change all ocurences of data from fetches to user
							const user = JSONUser ? JSON.parse(JSONUser) : {};

							console.log('Found local storage user:', user);
							if (user.testPlayer) data.testPlayer = user.testPlayer;

							gameDriver.awake(data);
							gameDriver.giveNavigator(props.navigation);

							//At this point this is a check to see if this is the users first time playing
							/* If true then */
							if (storyLogic.checkForUnhandledStory()) {
								storyLogic.fillChapterQueAndChapter();
							}
							props.navigation.navigate('Play', { type: 'beginning' });
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
