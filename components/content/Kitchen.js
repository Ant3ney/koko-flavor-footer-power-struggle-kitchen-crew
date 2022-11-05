import React, { PureComponent } from 'react';
import { View, Text, AppRegistry, StyleSheet, Dimensions, Button, AppState } from 'react-native';
import { GameLoop } from 'react-native-game-engine';
import Scenario from './Scenario';
import kitchenStyles from '../../Styles/kitchen';
import Upgrade from './Upgrade';
import StatScreen from '../../components/content/Schedule/Screen';
import StationOptions from './StationOptions';
import { click } from '../../GameLogic/AudioSystem';

class Kitchen extends PureComponent {
	constructor(props) {
		super();
		this.state = {
			x: 12,
			y: 22,
			appState: AppState.currentState,
			scenarioPresent: false,
			upgradeMenu: false,
			showStatMenu: false,
			showStationOptions: false,
		};

		this.gameDriver = props.gameLogic.GameDriver;
		this.mStats = props.gameLogic.manageStats;
		this.schedule = this.mStats.getShiftCharacters();
	}

	//helper functions
	setScenerio = scenario => {
		this.setState({ scenarioPresent: scenario }); //This state will influence a turinaty operator witch will then render or not render a component
		this.mStats.setScenarioPresent(scenario); //This mStats function will basicity stop the gameplay loop ticking
	};
	setUpgrade = upgrade => {
		this.setState({ upgradeMenu: upgrade }); //This state will influence a turinaty operator witch will then render or not render a component
	};

	componentDidMount() {
		console.log('Kitchen has loaded');
		AppState.addEventListener('change', this._handleAppStateChange);
		this.gameDriver.on('tic', () => {
			if (this.gameDriver.scenarioCheck().reply) {
				this.setScenerio(true);
			}
		});
		this.mStats.setInForground(true);

		this.gameDriver.on('end level', gameDetails => {
			if (gameDetails.hasWon === true) {
				this.props.gameLogic.staticConversation.procWin(true);
				this.props.navigation.navigate('Conversation', { type: 'win' });
			} else if (gameDetails.hasLost === true) this.props.navigation.navigate('Conversation 2', { type: 'lose' });
			else this.props.navigation.navigate('Level Report');
		});
	}

	//Note to self consider using this function to handle when to call the quit function
	componentWillUnmount() {
		//Garbage collection
		AppState.removeEventListener('change', this._handleAppStateChange);
	}

	_handleAppStateChange = nextAppState => {
		if (this.state.appState.match(/inactive|background/)) {
			console.log('App is in foreground!');
			this.mStats.setInForground(true);
		} else {
			console.log('This is the background');
			this.mStats.setInForground(false);
		}
		this.setState({ appState: nextAppState });
	};

	render() {
		return (
			<View style={kitchenStyles.container}>
				{this.state.scenarioPresent ? <Scenario setScenerio={this.setScenerio} /> : <View />}
				{this.state.upgradeMenu ? <Upgrade setUpgrade={this.setUpgrade} /> : <View></View>}
				{this.state.showStatMenu ? (
					<StatScreen
						schedule={this.schedule}
						exitSchedual={this.exitSchedual}
						day={this.mStats.getCurrentDay()}
					/>
				) : (
					<View></View>
				)}

				<GameLoop
					onUpdate={() => {
						this.gameDriver.update();
					}}
				></GameLoop>
				<Text>
					How to play. Hustle to increase station effectiveness. Make decisions when scenarios arise. Power
					determines you progression in the story. Having too low power will cause you to lose. Effectiveness
					determines how much power you get per each ten minutes. Skill determines how much effectiveness you
					gain or lose when the busyness rises or falls. When the time is 5:00 or 10:00 the shift will end
					depending on weather you playing a day or night shift. Energy determines how many times you can
					press the hustle button. Busyness will give or remove effectiveness based on your skill level and
					the busyness level that came before the current value. Sanity will reduce you station effectiveness
					every 100 game minutes if it is less then 0. Next hour will allow you to skip 10 game minutes into
					the future. Shift will allow you to see who is currently in the shift with you. For other NPCs, only
					there power and sanity have an effect. At the end of each shift, NPCs will either gain or lose power
					based on weather there sanity level is positive. If an NPC gains 10,000 power, you will lose the
					game. To win the game you must obtain 10,000 power.
				</Text>
				{this.state.showStationOptions ? (
					<StationOptions gameLogic={this.props.gameLogic} exit={this.exitStationOptions} />
				) : (
					<View />
				)}
				<Button
					title='Hustle'
					onPress={() => {
						click();
						if (this.mStats.getPEnergy() > 0) {
							this.mStats.setPEnergy(this.mStats.getPEnergy() - 1);
							this.mStats.setPEffectivness(this.mStats.getPEffectivness() + 10);
							this.mStats.setPSkillPoints(this.mStats.getPSkillPoints() + 1);
						}
					}}
				/>
				<Button
					title='Next hour'
					onPress={() => {
						click();
						this.mStats.incrementHour();
					}}
				/>
				{/* <Button
					title='Switch'
					onPress={() => {
						this.setState({ showStationOptions: true });
					}}
				/> */}
				{/* <Button
					title='Upgrade'
					onPress={() => {
						this.setUpgrade(true);
					}}
				/> */}
				<Button
					title='Shift'
					onPress={() => {
						click();
						this.setState({ showStatMenu: true });
					}}
				/>
			</View>
		);
	}

	exitSchedual = () => {
		this.setState({ showStatMenu: false });
	};
	exitStationOptions = () => {
		this.setState({ showStationOptions: false });
	};
}

AppRegistry.registerComponent('Kitchen', () => Kitchen);

export default Kitchen;
