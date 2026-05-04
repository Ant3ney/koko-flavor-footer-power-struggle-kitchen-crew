import React, { PureComponent } from 'react';
import { AppRegistry, AppState, Image, Text, View } from 'react-native';
import { GameLoop } from 'react-native-game-engine';
import { click } from '../../GameLogic/AudioSystem';
import { ActionButton, BodyText, Eyebrow, Panel, ui } from '../uiKit';
import Scenario from './Scenario';
import StatScreen from '../../components/content/Schedule/Screen';
import StationOptions from './StationOptions';
import Upgrade from './Upgrade';

const kitchenArt = require('../../assets/kitchen_art.png');

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
		const compact = this.props.compact;
		return (
			<View style={[styles.container, compact && styles.containerCompact]}>
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

				<Panel style={[styles.kitchenPanel, compact && styles.kitchenPanelCompact]}>
					<View style={[styles.kitchenHeader, compact && styles.kitchenHeaderCompact]}>
						<View style={[styles.headerTitleBlock, compact && styles.headerTitleBlockCompact]}>
							<Eyebrow>Kitchen Map</Eyebrow>
							<Text style={[styles.title, compact && styles.titleCompact]}>Decision Floor</Text>
						</View>
						<View style={[styles.headerActions, compact && styles.headerActionsCompact]}>
							<Text style={[styles.stationBadge, compact && styles.stationBadgeCompact]}>
								Station: {formatStationName(this.state.currentStation)}
							</Text>
							{compact ? (
								<ActionButton
									title='Settings'
									compact
									variant='ghost'
									style={styles.settingsHeaderButton}
									onPress={() => {
										click();
										this.props.gameLogic.GameDriver.leftGamePlay(true);
										this.props.navigation.navigate('Settings');
									}}
								/>
							) : null}
						</View>
					</View>

					<View
						style={[
							styles.kitchenArtFrame,
							!compact && styles.kitchenArtFrameWide,
							compact && styles.kitchenArtFrameCompact,
						]}
					>
						<Image source={kitchenArt} style={styles.kitchenArt} resizeMode={compact ? 'cover' : 'contain'} />
					</View>

					<View style={[styles.stationGrid, compact && styles.stationGridCompact]}>
						<StationNode title='Sauce' tone={ui.red} compact={compact} />
						<StationNode title='Frier' tone={ui.orange} compact={compact} />
						<StationNode title='Rice' tone={ui.gold} compact={compact} />
						<StationNode title='Pantry' tone={ui.blue} compact={compact} />
					</View>

					{compact ? null : (
						<BodyText style={styles.instructions}>
							Hustle to raise effectiveness. Scenarios interrupt the floor when the pressure system demands a
							decision. Power moves the story; sanity keeps the machine from eating the run.
						</BodyText>
					)}

					{this.state.showStationOptions ? (
						<StationOptions
							gameLogic={this.props.gameLogic}
							exit={this.exitStationOptions}
							onStationChange={station => this.setState({ currentStation: station })}
						/>
					) : null}

					<View style={[styles.actions, compact && styles.actionsCompact]}>
						<ActionButton
							title='Hustle'
							compact={compact}
							style={compact && styles.compactAction}
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
							compact={compact}
							style={compact && styles.compactAction}
							onPress={() => {
								click();
								this.mStats.incrementHour();
							}}
						/>
						<ActionButton
							title='Shift Crew'
							variant='secondary'
							compact={compact}
							style={compact && styles.compactAction}
							onPress={() => {
								click();
								this.setState({ showStatMenu: true });
							}}
						/>
						<ActionButton
							title='Switch Station'
							variant='secondary'
							compact={compact}
							style={compact && styles.compactAction}
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

function StationNode({ compact, title, tone }) {
	return (
		<View style={[styles.stationNode, compact && styles.stationNodeCompact]}>
			<View style={[styles.stationDot, compact && styles.stationDotCompact, { backgroundColor: tone }]} />
			<Text style={[styles.stationName, compact && styles.stationNameCompact]}>{title}</Text>
		</View>
	);
}

const styles = {
	container: {
		width: '100%',
		maxWidth: 1180,
		alignSelf: 'center',
		paddingHorizontal: 12,
		paddingVertical: 12,
		flex: 1,
		flexGrow: 1,
		flexShrink: 1,
		minHeight: 0,
		boxSizing: 'border-box',
	},
	containerCompact: {
		paddingHorizontal: 0,
		paddingTop: 0,
		paddingBottom: 0,
		flex: 1,
		flexGrow: 1,
		flexShrink: 1,
		minHeight: 0,
	},
	kitchenPanel: {
		minHeight: 420,
		gap: 18,
	},
	kitchenPanelCompact: {
		flex: 1,
		flexGrow: 1,
		flexShrink: 1,
		minHeight: 0,
		width: '100%',
		gap: 6,
		padding: 0,
		overflow: 'hidden',
		borderLeftWidth: 0,
		borderRightWidth: 0,
	},
	kitchenHeader: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 14,
	},
	kitchenHeaderCompact: {
		flexWrap: 'nowrap',
		gap: 5,
		flexShrink: 0,
		paddingHorizontal: 8,
		paddingTop: 6,
	},
	headerTitleBlock: {
		minWidth: 0,
	},
	headerTitleBlockCompact: {
		flex: 1,
		flexShrink: 1,
	},
	headerActions: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'flex-end',
		gap: 8,
	},
	headerActionsCompact: {
		flex: 0,
		minWidth: 0,
		gap: 4,
		flexWrap: 'nowrap',
	},
	settingsHeaderButton: {
		minWidth: 0,
		paddingHorizontal: 6,
		flexShrink: 0,
	},
	title: {
		color: ui.ink,
		fontSize: 30,
		fontWeight: '900',
	},
	titleCompact: {
		fontSize: 16,
		lineHeight: 19,
	},
	stationBadge: {
		color: ui.white,
		backgroundColor: ui.ink,
		paddingHorizontal: 14,
		paddingVertical: 10,
		fontSize: 13,
		fontWeight: '900',
		textTransform: 'uppercase',
		maxWidth: '100%',
	},
	stationBadgeCompact: {
		display: 'none',
	},
	kitchenArtFrameCompact: {
		alignSelf: 'stretch',
		aspectRatio: 1672 / 941,
		flexGrow: 0,
		flexShrink: 0,
		minHeight: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
	},
	kitchenArtFrame: {
		width: '100%',
		backgroundColor: '#FFF4DD',
		borderWidth: 1,
		borderColor: '#FFDCA4',
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',
	},
	kitchenArtFrameWide: {
		aspectRatio: 1672 / 941,
	},
	kitchenArt: {
		width: '100%',
		height: '100%',
	},
	stationGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
	},
	stationGridCompact: {
		flexWrap: 'nowrap',
		gap: 4,
		flexShrink: 0,
		paddingHorizontal: 8,
	},
	stationNode: {
		flex: 1,
		minWidth: 120,
		minHeight: 118,
		backgroundColor: '#FFF4DD',
		borderWidth: 1,
		borderColor: '#FFDCA4',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},
	stationNodeCompact: {
		minWidth: 0,
		minHeight: 32,
		gap: 3,
		paddingVertical: 3,
	},
	stationDot: {
		width: 34,
		height: 34,
		borderRadius: 17,
	},
	stationDotCompact: {
		width: 13,
		height: 13,
		borderRadius: 6.5,
	},
	stationName: {
		color: ui.ink,
		fontSize: 18,
		fontWeight: '900',
		textTransform: 'uppercase',
	},
	stationNameCompact: {
		fontSize: 9,
	},
	instructions: {
		maxWidth: 780,
	},
	actions: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10,
	},
	actionsCompact: {
		flexWrap: 'wrap',
		gap: 4,
		flexShrink: 0,
		paddingHorizontal: 8,
		paddingBottom: 8,
	},
	compactAction: {
		flexBasis: '48%',
		flexGrow: 1,
		minWidth: 0,
		paddingHorizontal: 4,
		minHeight: 34,
	},
};

AppRegistry.registerComponent('Kitchen', () => Kitchen);

export default Kitchen;
