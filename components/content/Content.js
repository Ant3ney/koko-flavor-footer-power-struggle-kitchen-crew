import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import UpperHud from './UpperHud';
import Kitchen from './Kitchen';
import LowerHud from './LowerHud';
import basic from '../../Styles/basics';

//Content is the home of the game loop. Its where gameplay happeons
function Content(props) {
	return (
		<View style={basic.fluidContainer}>
			<UpperHud gameLogic={props.gameLogic} />
			<Kitchen gameLogic={props.gameLogic} navigation={props.navigation} simpleNav={props.simpleNav} />
			<LowerHud gameLogic={props.gameLogic} navigation={props.navigation} simpleNav={props.simpleNav} />
		</View>
	);
}

export default Content;
