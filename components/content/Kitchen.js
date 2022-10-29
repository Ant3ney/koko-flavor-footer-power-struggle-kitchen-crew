import React, { PureComponent } from 'react';
import { View, Text, AppRegistry, StyleSheet, Dimensions, Button, AppState } from 'react-native';
import { GameLoop } from 'react-native-game-engine';
import Scenario from './Scenario';
import kitchenStyles from '../../Styles/kitchen';
import Upgrade from './Upgrade';
import StatScreen from '../../components/content/Schedule/Screen';
import StationOptions from './StationOptions';

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
		this.mStats.setScenarioPresent(scenario); //This mStats function will basicly stop the gameplay loop ticing
	};
	setUpgrade = upgrade => {
		this.setState({ upgradeMenu: upgrade }); //This state will influence a turinaty operator witch will then render or not render a component
	};

	//Mounting / unmounting
	componentDidMount() {
		//THis is a component that happens once at the start of Kitchen being rendered
		//These event listeners need to have proper garbage collection implemented
		AppState.addEventListener('change', this._handleAppStateChange);
		this.gameDriver.on('tic', () => {
			if (this.gameDriver.scenarioCheck().reply) {
				this.setScenerio(true);
			}
		});

		this.gameDriver.on('end level', gameDetails => {
			if (gameDetails.hasWon === true) {
				this.props.gameLogic.staticConversation.procWin(true);
				this.props.navigation.navigate('Conversation', { type: 'win' });
			} else if (gameDetails.hasLost === true) {
				this.props.navigation.navigate('Conversation', { type: 'lose' });
			} else {
				this.props.navigation.navigate('Level Report');
			}
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
					Cronut semiotics raw denim, coloring book +1 williamsburg chartreuse before they sold out. Etsy
					cardigan gochujang master cleanse. Blog food truck PBR&B williamsburg helvetica. Tilde wayfarers
					freegan retro meggings, mlkshk hexagon polaroid street art vape single-origin coffee keytar unicorn.
					Biodiesel food truck tofu chicharrones gluten-free, ethical etsy locavore polaroid. Ramps poke
					tumblr, venmo hoodie kitsch chia four loko brooklyn copper mug. Sartorial cray hashtag migas venmo
					chicharrones godard cred thundercats biodiesel.
				</Text>
				{this.state.showStationOptions ? (
					<StationOptions gameLogic={this.props.gameLogic} exit={this.exitStationOptions} />
				) : (
					<View />
				)}
				<Button
					title='Hussle'
					onPress={() => {
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
						this.mStats.incrementHour();
					}}
				/>
				<Button
					title='Switch'
					onPress={() => {
						this.setState({ showStationOptions: true });
					}}
				/>
				<Button
					title='Upgrade'
					onPress={() => {
						this.setUpgrade(true);
					}}
				/>
				<Button
					title='Shift'
					onPress={() => {
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
