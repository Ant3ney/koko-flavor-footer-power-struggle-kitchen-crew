import React from 'react';
import { StyleSheet, View } from 'react-native';

import MainNavMenu from './components/Navs/MainMenu';
import GameLogicFile from './GameLogic/GameLogic';
import appStyle from './Styles/app';

var gameLogic = GameLogicFile;

{
	/* <meta property='og:title' content='ココFlavor Fodder.' />
	<meta
		property='og:description'
		content='John gets transferred and all of s sudden there is a huge void in authority in ココ. The employees begin there quest to gain power in ココ.  Dave makes the first move for power but is quickly shot down by his peers, Cedric quietly makes moves along with Vicky. Mean while Keith and Xander are moving full steam ahead towards power. '
	/>
	<meta property='og:image' content={logo} /> */
}

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
