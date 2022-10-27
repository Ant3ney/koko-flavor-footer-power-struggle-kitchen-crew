import React from 'react';
import { View, Text, Button } from 'react-native';
import basic from '../Styles/basics';
import { useNavigation } from '@react-navigation/native';

export default function Credits(props) {
	const navigation = useNavigation();
	return (
		<View style={[basic.centerContainer, basic.bgWhite]}>
			<Button
				title='Back'
				onPress={() => {
					props.gameLogic.GameDriver.possibleGamePlayReturn(true);
					navigation.goBack();
				}}
			/>
			<Text>Credits</Text>
			<Text>Game Director: Anthony Cavuoti</Text>
			<Text>Voice Actor: delaneygilmour from fiverr</Text>
			<Text>Voice Actor: thegreattoddman from fiverr</Text>
			<Text>Voice Actor: cessinistas from fiverr</Text>
			<Text>Voice Actor: huskycommander from fiverr</Text>
			<Text>Voice Actor: Jannik Baur</Text>
			<Text>Voice Actor: Victor</Text>
			<Text>Voice Actor: Taylor Sanchez</Text>
			<Text>Voice Actor: Nathan</Text>
			<Text>Voice Actor: Dante Ayala</Text>
			<Text>Music: Joseph and the Amazing Technicolor Dreamcoat</Text>
			<Text>Music transposition: Anthony Cavuoti</Text>
			<Text>Scenario Consultant: Brad Yanagi</Text>
		</View>
	);
}
