import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import gameDriver from '../../GameLogic/GameDriver';
import storyLogic from '../../GameLogic/StoryLogic';
import basic from '../../Styles/basics';
import testCharacters from '../../GameLogic/PresetsAndTemplates/testCharacters';

function MainMenu(props) {
	return (
		<View style={[basic.centerContainer, basic.bgWhite]}>
			<Text>Gravyhouse. Flavor Fodder</Text>
			<Button
				title='Play'
				onPress={() => {
					props.navigation.navigate('Loading');
					fetch('https://coco-game-17308.herokuapp.com/testApi/characters')
						.then(response => response.json())
						.then(data => {
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

			<Button title='Login' onPress={() => {}} />

			<Button title='Sign up' onPress={() => {}} />

			<Button
				title='Share'
				onPress={() => {
					props.navigation.navigate('Share');
				}}
			/>

			<Button
				title='Leaderbords'
				onPress={() => {
					props.navigation.navigate('Leaderbords');
				}}
			/>

			<Button
				title='Settings'
				onPress={() => {
					props.navigation.navigate('Settings');
				}}
			/>
		</View>
	);
}

export default MainMenu;
