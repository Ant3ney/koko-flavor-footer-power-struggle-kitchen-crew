import React from 'react';
import { StyleSheet, View } from 'react-native';

import MainNavMenu from './components/Navs/MainMenu';
import GameLogicFile from './GameLogic/GameLogic';
import appStyle from './Styles/app';
var gameLogic = GameLogicFile;

export default function App() {
	return (
		<View style={appStyle.container}>
			<MainNavMenu gameLogic={gameLogic} />
		</View>
	);
}

const styles = StyleSheet.create({
	simpleContainer: {
		flex: 1,
	},
	centerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	bgWhite: {
		backgroundColor: '#fff',
	},
	container: {
		backgroundColor: 'yellow',
		height: 400,
		width: 200,
	},
});
