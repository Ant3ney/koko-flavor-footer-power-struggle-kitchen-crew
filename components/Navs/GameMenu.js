import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Content from '../content/Content';
import LevelReport from '../content/LevelReport';
import ShiftHub from '../content/ShiftHub';
import Conversation from '../content/Conversation';
import Loading from '../Loading';
import Win from '../content/Win';
import Lose from '../content/Lose';
import util from '../../Utilities';

const Stack = createStackNavigator();

function GameMenuNav(props) {
	console.log('GameMenuNav props:', props);
	let type = util.getConversationTypeFromProps(props);

	const ProxyConversation = proxyProps => {
		let type =
			util.getConversationTypeFromProps(proxyProps) === 'error'
				? util.getConversationTypeFromProps(props)
				: util.getConversationTypeFromProps(proxyProps);
		return (
			<Conversation
				styleProp={props.styleProp}
				navigation={proxyProps.navigation}
				gameLogic={props.gameLogic}
				type={type}
			/>
		);
	};

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			{type === 'beginning' ? (
				<Stack.Screen name='Begin Story'>{ProxyConversation}</Stack.Screen>
			) : (
				<Stack.Screen name='Initial Shift Select'>
					{inProps => <ShiftHub navigation={props.navigation} gameLogic={props.gameLogic} />}
				</Stack.Screen>
			)}

			<Stack.Screen name='Next Shift Select'>
				{inProps => <ShiftHub navigation={props.navigation} gameLogic={props.gameLogic} />}
			</Stack.Screen>

			<Stack.Screen name='Shift'>
				{inProps => <Content {...inProps} navigation={props.navigation} gameLogic={props.gameLogic} />}
			</Stack.Screen>

			<Stack.Screen name='Level Report'>
				{inProps => <LevelReport navigation={props.navigation} gameLogic={props.gameLogic} />}
			</Stack.Screen>

			<Stack.Screen name='Conversation'>
				{proxyProps => {
					let type = util.getConversationTypeFromProps(proxyProps);
					return (
						<Conversation
							styleProp={props.styleProp}
							navigation={props.navigation}
							gameLogic={props.gameLogic}
							type={type}
						/>
					);
				}}
			</Stack.Screen>
			{/* This is required due to how navigation stacks work */}
			<Stack.Screen name='Begin Conversation'>
				{proxyProps => {
					let type = util.getConversationTypeFromProps(proxyProps);
					return (
						<Conversation
							styleProp={props.styleProp}
							navigation={props.navigation}
							gameLogic={props.gameLogic}
							type={type}
						/>
					);
				}}
			</Stack.Screen>

			<Stack.Screen name='Loading Local'>{inProps => <Loading />}</Stack.Screen>

			<Stack.Screen name='Win screen'>
				{inProps => <Win navigation={props.navigation} gameLogic={props.gameLogic} />}
			</Stack.Screen>

			<Stack.Screen name='Lose screen'>
				{inProps => <Lose navigation={props.navigation} gameLogic={props.gameLogic} />}
			</Stack.Screen>
		</Stack.Navigator>
	);

	/* function ProxyConversation(proxyProps) {
		let type = util.getConversationTypeFromProps(proxyProps);
		return (
			<Conversation
				styleProp={props.styleProp}
				navigation={proxyProps.navigation}
				gameLogic={props.gameLogic}
				type={type}
			/>
		);
	} */
}

export default GameMenuNav;
