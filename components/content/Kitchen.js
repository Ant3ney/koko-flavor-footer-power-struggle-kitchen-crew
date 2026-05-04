import React, { PureComponent } from 'react';
import { AppRegistry, AppState, Text, View } from 'react-native';
import { GameLoop } from 'react-native-game-engine';
import { click } from '../../GameLogic/AudioSystem';
import { ActionButton, BodyText, Eyebrow, Panel, ui } from '../uiKit';
import Scenario from './Scenario';
import StatScreen from '../../components/content/Schedule/Screen';
import StationOptions from './StationOptions';
import Upgrade from './Upgrade';

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
			currentStation: props.gameLogic.manageStats.getPStation(),
		};

		this.gameDriver = props.gameLogic.GameDriver;
		this.mStats = props.gameLogic.manageStats;
		this.schedule = this.mStats.getShiftCharacters();
	}

	setScenerio = scenario => {
		this.setState({ scenarioPresent: scenario });
		this.mStats.setScenarioPresent(scenario);
	};
	setUpgrade = upgrade => {
		this.setState({ upgradeMenu: upgrade });
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

	componentWillUnmount() {
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
			<View style={styles.container}>
				{this.state.scenarioPresent ? <Scenario setScenerio={this.setScenerio} /> : null}
				{this.state.upgradeMenu ? <Upgrade setUpgrade={this.setUpgrade} /> : null}
				{this.state.showStatMenu ? (
					<StatScreen schedule={this.schedule} exitSchedual={this.exitSchedual} day={this.mStats.getCurrentDay()} />
				) : null}

				<GameLoop
					onUpdate={() => {
						this.gameDriver.update();
					}}
				/>

				<Panel style={styles.kitchenPanel}>
					<View style={styles.kitchenHeader}>
						<View>
							<Eyebrow>Kitchen Map</Eyebrow>
							<Text style={styles.title}>Decision Floor</Text>
						</View>
						<Text style={styles.stationBadge}>Station: {formatStationName(this.state.currentStation)}</Text>
					</View>

					<View style={styles.stationGrid}>
						<StationNode title='Sauce' tone={ui.red} />
						<StationNode title='Frier' tone={ui.orange} />
						<StationNode title='Rice' tone={ui.gold} />
						<StationNode title='Pantry' tone={ui.blue} />
					</View>

					<BodyText style={styles.instructions}>
						Hustle to raise effectiveness. Scenarios interrupt the floor when the pressure system demands a
						decision. Power moves the story; sanity keeps the machine from eating the run.
					</BodyText>

					{this.state.showStationOptions ? (
						<StationOptions
							gameLogic={this.props.gameLogic}
							exit={this.exitStationOptions}
							onStationChange={station => this.setState({ currentStation: station })}
						/>
					) : null}

					<View style={styles.actions}>
						<ActionButton
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
						<ActionButton
							title='Next Hour'
							variant='secondary'
							onPress={() => {
								click();
								this.mStats.incrementHour();
							}}
						/>
						<ActionButton
							title='Shift Crew'
							variant='secondary'
							onPress={() => {
								click();
								this.setState({ showStatMenu: true });
							}}
						/>
						<ActionButton
							title='Switch Station'
							variant='secondary'
							onPress={() => {
								click();
								this.setState({ showStationOptions: true });
							}}
						/>
					</View>
				</Panel>
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

function formatStationName(station) {
	if (station === 'sause') {
		return 'Sauce';
	}
	if (station === 'frier') {
		return 'Fryer';
	}
	return station || 'Unknown';
}

function StationNode({ title, tone }) {
	return (
		<View style={styles.stationNode}>
			<View style={[styles.stationDot, { backgroundColor: tone }]} />
			<Text style={styles.stationName}>{title}</Text>
		</View>
	);
}

const styles = {
	container: {
		width: '100%',
		maxWidth: 1180,
		alignSelf: 'center',
		paddingHorizontal: 24,
		paddingVertical: 12,
		flex: 1,
	},
	kitchenPanel: {
		minHeight: 420,
		gap: 18,
	},
	kitchenHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 14,
	},
	title: {
		color: ui.ink,
		fontSize: 30,
		fontWeight: '900',
	},
	stationBadge: {
		color: ui.white,
		backgroundColor: ui.ink,
		paddingHorizontal: 14,
		paddingVertical: 10,
		fontSize: 13,
		fontWeight: '900',
		textTransform: 'uppercase',
	},
	stationGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
	},
	stationNode: {
		flex: 1,
		minWidth: 160,
		minHeight: 118,
		backgroundColor: '#FFF4DD',
		borderWidth: 1,
		borderColor: '#FFDCA4',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},
	stationDot: {
		width: 34,
		height: 34,
		borderRadius: 17,
	},
	stationName: {
		color: ui.ink,
		fontSize: 18,
		fontWeight: '900',
		textTransform: 'uppercase',
	},
	instructions: {
		maxWidth: 780,
	},
	actions: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10,
	},
};

AppRegistry.registerComponent('Kitchen', () => Kitchen);

export default Kitchen;
