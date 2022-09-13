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
			<Text>Voice Actor: delaneygilmour</Text>
			<Text>Voice Actor: thegreattoddman</Text>
			<Text>Voice Actor: cessinistas</Text>
			<Text>Voice Actor: huskycommander</Text>
		</View>
	);
}
