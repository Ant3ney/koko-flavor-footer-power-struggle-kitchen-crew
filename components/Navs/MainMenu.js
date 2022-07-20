import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameMenuNav from './GameMenu';
import PressStart from '../PressStart';
import MainMenu from './StartMenu';
import Settings from '../Settings';
import Share from '../Share';
import Leaderbords from '../Leaderbords';
import Loading from '../Loading';

const Stack = createStackNavigator();

function MainNavMenu(props) {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name='Start Menu'>{inProps => <PressStart {...inProps} />}</Stack.Screen>

				<Stack.Screen name='Main Menu'>
					{inProps => <MainMenu {...inProps} styleProp={props.styleProp} gameLogic={props.gameLogic} />}
				</Stack.Screen>

				<Stack.Screen name='Play'>
					{inProps => <GameMenuNav {...inProps} styleProp={props.styleProp} gameLogic={props.gameLogic} />}
				</Stack.Screen>

				<Stack.Screen name='Settings'>
					{inProps => <Settings {...inProps} styleProp={props.styleProp} gameLogic={props.gameLogic} />}
				</Stack.Screen>

				<Stack.Screen name='Share'>
					{inProps => <Share {...inProps} styleProp={props.styleProp} gameLogic={props.gameLogic} />}
				</Stack.Screen>

				<Stack.Screen name='Leaderbords'>
					{inProps => <Leaderbords {...inProps} styleProp={props.styleProp} gameLogic={props.gameLogic} />}
				</Stack.Screen>

				<Stack.Screen name='Loading'>{inProps => <Loading />}</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default MainNavMenu;
