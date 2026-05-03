import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { click, music } from '../../GameLogic/AudioSystem';
import mStats from '../../GameLogic/ManageStats/ManageStats';
import presets from '../../GameLogic/PresetsAndTemplates/ShiftPresets';
import shiftHubLogic from '../../GameLogic/ShiftHub';
import { saveUser } from '../../GameLogic/SaveSystem';
import { ActionButton, AppScreen, BodyText, Eyebrow, Panel, ScreenHeader, StatCard, ui } from '../uiKit';
import { characters, assembleSchedule } from '../tempOfflineBackend';
import ScheduleScreen from './Schedule/Screen';

var focusSchedule = null;

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function ShiftHub(props) {
	const [currentDay, setCurrentDay] = useState(mStats.getCurrentDay());
	const [schedule, setSchedual] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const isFocused = useIsFocused();

	useEffect(() => {
		console.log('Pausing music');
		music.pause();

		if (mStats.determinLoseCondition()) handleLose(props, setIsLoading);
	}, []);

	useEffect(() => {
		mStats.onDayChange(() => {
			setCurrentDay(mStats.getCurrentDay());
		}, 'current day');
	}, [isFocused]);

	if (isLoading)
		return (
			<AppScreen>
				<Panel>
					<Eyebrow>Processing</Eyebrow>
					<BodyText>Loading next state...</BodyText>
				</Panel>
			</AppScreen>
		);

	return (
		<AppScreen scroll>
			{schedule ? (
				<ScheduleScreen schedule={focusSchedule} exitSchedual={exitSchedual} day={mStats.getCurrentDay()} />
			) : null}

			<ScreenHeader
				eyebrow='Shift Command'
				title='Select Your Next Shift'
				subtitle='Pick a day, read the crew, and choose the pressure window you want to survive.'
			/>

			<View style={styles.statRow}>
				<StatCard label='Current Power' value={props.gameLogic.manageStats.getPPower()} accent={ui.red} large />
				<StatCard label='Current Sanity' value={props.gameLogic.manageStats.getPSanity()} accent={ui.blue} large />
				<StatCard label='Current Day' value={capitalize(currentDay)} accent={ui.gold} large />
			</View>

			<View style={styles.dayGrid}>
				{days.map(day => (
					<DayCard
						key={day}
						day={day}
						disabled={shiftHubLogic.getDisabledOf(day)}
						onStart={shift => startShift(props, day, shift)}
						onSchedule={shift => showSchedule(day, shift, setSchedual)}
					/>
				))}
			</View>

			<Panel style={styles.weekPanel}>
				<View style={styles.weekCopy}>
					<Eyebrow>Week Control</Eyebrow>
					<BodyText>
						Advance the calendar when every useful shift has been played, or reset data for testing.
					</BodyText>
				</View>
				<View style={styles.weekActions}>
					<ActionButton
						title='Next Week'
						onPress={async () => {
							click();
							shiftHubLogic.manageDaysUpTo(presets('sunday').day, {
								aplyWholeDay: true,
								resetButton: true,
							});
							shiftHubLogic.freeUpAllDays();
							props.navigation.navigate('Loading Local');
							mStats.setPSanity(30);

							const structure = await fetchSchedule();

							mStats.setSchedualFromShiftStructure(structure);
							await saveUser();

							if (mStats.determinLoseCondition()) {
								handleLose(props, setIsLoading);
							} else {
								props.simpleNav('Next Shift Select');
							}
						}}
					/>
					<ActionButton
						title='Reset Data'
						variant='danger'
						onPress={() => {
							click();
							mStats.resetData(props.gameLogic.GameDriver);
						}}
					/>
				</View>
			</Panel>
		</AppScreen>
	);

	function exitSchedual() {
		setSchedual(false);
	}
}

function DayCard({ day, disabled, onSchedule, onStart }) {
	return (
		<Panel style={[styles.dayCard, disabled && styles.dayCardDisabled]}>
			<View style={styles.dayHeader}>
				<View>
					<Text style={styles.dayName}>{capitalize(day)}</Text>
					<Text style={styles.dayStatus}>{disabled ? 'Locked by calendar' : 'Available'}</Text>
				</View>
				<View style={[styles.statusDot, disabled && styles.statusDotDisabled]} />
			</View>

			<View style={styles.shiftRows}>
				<ShiftRow
					label='Day Shift'
					disabled={disabled}
					onStart={() => onStart('day')}
					onSchedule={() => onSchedule('day')}
				/>
				<ShiftRow
					label='Night Shift'
					disabled={disabled}
					onStart={() => onStart('night')}
					onSchedule={() => onSchedule('night')}
				/>
			</View>
		</Panel>
	);
}

function ShiftRow({ disabled, label, onSchedule, onStart }) {
	return (
		<View style={styles.shiftRow}>
			<Text style={styles.shiftLabel}>{label}</Text>
			<View style={styles.shiftActions}>
				<ActionButton title='Start' compact disabled={disabled} onPress={onStart} />
				<ActionButton title='Crew' compact variant='secondary' onPress={onSchedule} />
			</View>
		</View>
	);
}

function startShift(props, day, shift) {
	click();
	props.gameLogic.GameDriver.start(presets(day)[shift]);
	shiftHubLogic.manageDaysUpTo(presets(day)[shift]);
	if (day === 'saturday' && shift === 'night') props.navigation.navigate('Shift');
	else props.simpleNav('Shift');
}

function showSchedule(day, shift, setSchedual) {
	click();
	focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets(day)[shift]);
	setSchedual(true);
}

function handleLose(props, setLoading) {
	if (setLoading) setLoading(true);
	setTimeout(() => {
		props.navigation.navigate('Conversation', { type: 'lose' });
		if (setLoading) setLoading(false);
	}, 3000);
}

function fetchSchedule() {
	return assembleSchedule(characters);
}

function capitalize(value) {
	return value.toString().slice(0, 1).toUpperCase() + value.toString().slice(1);
}

const styles = {
	statRow: {
		flexDirection: 'row',
		gap: 12,
		marginBottom: 18,
	},
	dayGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 14,
	},
	dayCard: {
		flexBasis: '48%',
		flexGrow: 1,
		minWidth: 300,
		gap: 16,
	},
	dayCardDisabled: {
		opacity: 0.62,
	},
	dayHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	dayName: {
		color: ui.ink,
		fontSize: 24,
		fontWeight: '900',
	},
	dayStatus: {
		color: ui.muted,
		fontSize: 12,
		fontWeight: '900',
		textTransform: 'uppercase',
		marginTop: 4,
	},
	statusDot: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: ui.green,
	},
	statusDotDisabled: {
		backgroundColor: ui.red,
	},
	shiftRows: {
		gap: 10,
	},
	shiftRow: {
		backgroundColor: '#FFF4DD',
		borderWidth: 1,
		borderColor: '#FFDCA4',
		padding: 12,
		gap: 10,
	},
	shiftLabel: {
		color: ui.brown,
		fontSize: 14,
		fontWeight: '900',
		textTransform: 'uppercase',
	},
	shiftActions: {
		flexDirection: 'row',
		gap: 8,
	},
	weekPanel: {
		marginTop: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 16,
	},
	weekCopy: {
		flex: 1,
		minWidth: 0,
	},
	weekActions: {
		minWidth: 220,
		gap: 10,
	},
};

export default ShiftHub;
