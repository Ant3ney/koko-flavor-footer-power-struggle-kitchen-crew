import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { click, music } from '../../GameLogic/AudioSystem';
import mStats from '../../GameLogic/ManageStats/ManageStats';
import presets from '../../GameLogic/PresetsAndTemplates/ShiftPresets';
import shiftHubLogic from '../../GameLogic/ShiftHub';
import basic from '../../Styles/basics';
import shiftHubStyle from '../../Styles/shiftHub';
import ScheduleScreen from './Schedule/Screen';
import { characters, assembleSchedule } from '../tempOfflineBackend';
import { saveUser } from '../../GameLogic/SaveSystem';

var focusSchedule = null;

function ShiftHub(props) {
	const [currentDay, setCurrentDay] = useState(mStats.getCurrentDay());
	const [schedule, setSchedual] = useState(false);
	const isFocused = useIsFocused();

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
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
			<View>
				<Text>Loading...</Text>
			</View>
		);

	return (
		<View style={{ ...shiftHubStyle.container, ...basic.gridContainer }}>
			{schedule ? (
				<ScheduleScreen schedule={focusSchedule} exitSchedual={exitSchedual} day={mStats.getCurrentDay()} />
			) : (
				<View></View>
			)}
			<Text>Select your next shift</Text>
			<Text>Current Power: {props.gameLogic.manageStats.getPPower()}</Text>
			<Text>Current Sanity: {props.gameLogic.manageStats.getPSanity()}</Text>
			<Text>Current Day: {currentDay.toString().slice(0, 1).toUpperCase() + currentDay.toString().slice(1)}</Text>
			<View style={basic.gridRow}>
				<View style={basic.gridColGeneric}>
					<Text>Monday</Text>
					<Button
						title='Day Shift'
						onPress={() => {
							click();
							props.gameLogic.GameDriver.start(presets('monday').day);
							shiftHubLogic.manageDaysUpTo(presets('monday').day);
							if (mStats.determinLoseCondition())
								props.navigation.navigate('Begin Conversation', { type: 'lose' });
							props.navigation.navigate('Shift');
						}}
						disabled={shiftHubLogic.getDisabledOf('monday')}
					/>
					<Button
						title='See schedule'
						onPress={() => {
							click();
							focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets('monday').day);
							setSchedual(true);
						}}
					/>
					<Button
						title='Night Shift'
						onPress={() => {
							click();
							props.gameLogic.GameDriver.start(presets('monday').night);
							shiftHubLogic.manageDaysUpTo(presets('monday').night);
							props.navigation.navigate('Shift');
						}}
						disabled={shiftHubLogic.getDisabledOf('monday')}
					/>
					<Button
						title='See schedule'
						onPress={() => {
							click();
							focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets('monday').night);
							setSchedual(true);
						}}
					/>
				</View>
				<View style={basic.gridColGeneric}>
					<Text>Tuesday</Text>
					<Button
						title='Day Shift'
						onPress={() => {
							click();
							props.gameLogic.GameDriver.start(presets('tuesday').day);
							shiftHubLogic.manageDaysUpTo(presets('tuesday').day);
							props.navigation.navigate('Shift');
						}}
						disabled={shiftHubLogic.getDisabledOf('tuesday')}
					/>
					<Button
						title='See schedule'
						onPress={() => {
							click();
							focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets('tuesday').day);
							setSchedual(true);
						}}
					/>
					<Button
						title='Night Shift'
						onPress={() => {
							click();
							props.gameLogic.GameDriver.start(presets('tuesday').night);
							shiftHubLogic.manageDaysUpTo(presets('tuesday').night);
							props.navigation.navigate('Shift');
						}}
						disabled={shiftHubLogic.getDisabledOf('tuesday')}
					/>
					<Button
						title='See schedule'
						onPress={() => {
							click();
							focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets('tuesday').night);
							setSchedual(true);
						}}
					/>
				</View>
			</View>
			<View style={basic.gridRow}>
				<View style={basic.gridColGeneric}>
					<Text>Wednesday</Text>
					<Button
						title='Day Shift'
						onPress={() => {
							click();
							props.gameLogic.GameDriver.start(presets('wednesday').day);
							shiftHubLogic.manageDaysUpTo(presets('wednesday').day);
							props.navigation.navigate('Shift');
						}}
						disabled={shiftHubLogic.getDisabledOf('wednesday')}
					/>
					<Button
						title='See schedule'
						onPress={() => {
							click();
							focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets('wednesday').day);
							setSchedual(true);
						}}
					/>
					<Button
						title='Night Shift'
						onPress={() => {
							click();
							props.gameLogic.GameDriver.start(presets('wednesday').night);
							shiftHubLogic.manageDaysUpTo(presets('wednesday').night);
							props.navigation.navigate('Shift');
						}}
						disabled={shiftHubLogic.getDisabledOf('wednesday')}
					/>
					<Button
						title='See schedule'
						onPress={() => {
							click();
							focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets('wednesday').night);
							setSchedual(true);
						}}
					/>
				</View>
				<View style={basic.gridColGeneric}>
					<Text>Thursday</Text>
					<Button
						title='Day Shift'
						onPress={() => {
							click();
							props.gameLogic.GameDriver.start(presets('thursday').day);
							shiftHubLogic.manageDaysUpTo(presets('thursday').day);
							props.navigation.navigate('Shift');
						}}
						disabled={shiftHubLogic.getDisabledOf('thursday')}
					/>
					<Button
						title='See schedule'
						onPress={() => {
							click();
							focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets('thursday').day);
							setSchedual(true);
						}}
					/>
					<Button
						title='Night Shift'
						onPress={() => {
							click();
							props.gameLogic.GameDriver.start(presets('thursday').night);
							shiftHubLogic.manageDaysUpTo(presets('thursday').night);
							props.navigation.navigate('Shift');
						}}
						disabled={shiftHubLogic.getDisabledOf('thursday')}
					/>
					<Button
						title='See schedule'
						onPress={() => {
							click();
							focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets('thursday').night);
							setSchedual(true);
						}}
					/>
				</View>
			</View>
			<View style={basic.gridRow}>
				<View style={basic.gridColGeneric}>
					<Text>Friday</Text>
					<Button
						title='Day Shift'
						onPress={() => {
							click();
							props.gameLogic.GameDriver.start(presets('friday').day);
							shiftHubLogic.manageDaysUpTo(presets('friday').day);
							props.navigation.navigate('Shift');
						}}
						disabled={shiftHubLogic.getDisabledOf('friday')}
					/>
					<Button
						title='See schedule'
						onPress={() => {
							click();
							focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets('friday').day);
							setSchedual(true);
						}}
					/>
					<Button
						title='Night Shift'
						onPress={() => {
							click();
							props.gameLogic.GameDriver.start(presets('friday').night);
							shiftHubLogic.manageDaysUpTo(presets('friday').night);
							props.navigation.navigate('Shift');
						}}
						disabled={shiftHubLogic.getDisabledOf('friday')}
					/>
					<Button
						title='See schedule'
						onPress={() => {
							click();
							focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets('friday').night);
							setSchedual(true);
						}}
					/>
				</View>
				<View style={basic.gridColGeneric}>
					<Text>Saturday</Text>
					<Button
						title='Day Shift'
						onPress={() => {
							click();
							props.gameLogic.GameDriver.start(presets('saturday').day);
							shiftHubLogic.manageDaysUpTo(presets('saturday').day);
							props.navigation.navigate('Shift');
						}}
						disabled={shiftHubLogic.getDisabledOf('saturday')}
					/>
					<Button
						title='See schedule'
						onPress={() => {
							click();
							focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets('saturday').day);
							setSchedual(true);
						}}
					/>
					<Button
						title='Night Shift'
						onPress={() => {
							click();
							props.gameLogic.GameDriver.start(presets('saturday').night);
							shiftHubLogic.manageDaysUpTo(presets('saturday').night);
							props.navigation.navigate('Shift');
						}}
						disabled={shiftHubLogic.getDisabledOf('saturday')}
					/>
					<Button
						title='See schedule'
						onPress={() => {
							click();
							focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets('saturday').night);
							setSchedual(true);
						}}
					/>
				</View>
			</View>
			<View style={basic.gridRow}>
				<View style={basic.gridColGeneric}>
					<Text>Sunday</Text>
					<Button
						title='Day Shift'
						onPress={() => {
							click();
							props.gameLogic.GameDriver.start(presets('sunday').day);
							shiftHubLogic.manageDaysUpTo(presets('sunday').day);
							props.navigation.navigate('Shift');
						}}
						disabled={shiftHubLogic.getDisabledOf('sunday')}
					/>
					<Button
						title='See schedule'
						onPress={() => {
							click();
							focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets('sunday').day);
							setSchedual(true);
						}}
					/>
					<Button
						title='Night Shift'
						onPress={() => {
							click();
							props.gameLogic.GameDriver.start(presets('sunday').night);
							shiftHubLogic.manageDaysUpTo(presets('sunday').night);
							props.navigation.navigate('Shift');
						}}
						disabled={shiftHubLogic.getDisabledOf('sunday')}
					/>
					<Button
						title='See schedule'
						onPress={() => {
							click();
							focusSchedule = mStats.getCharacterScheduleViaShiftPreset(presets('sunday').night);
							setSchedual(true);
						}}
					/>
				</View>
				<View>
					<Button
						title='Next Week'
						onPress={async () => {
							click();
							//Be very aware that this code is scaffolding and is very subject to change

							//Alow character to progress on any free day in the week
							shiftHubLogic.manageDaysUpTo(presets('sunday').day, {
								aplyWholeDay: true,
								resetButton: true,
							});
							shiftHubLogic.freeUpAllDays();
							props.navigation.navigate('Loading Local');
							mStats.setPSanity(30);

							const structure = await fetchSchedule();

							mStats.setSchedualFromShiftStructure(structure);
							//Player may have lost by pressing next week
							if (mStats.determinLoseCondition()) {
								handleLose(props);
							} else {
								props.navigation.navigate('Next Shift Select');
							}

							await saveUser();
						}}
					/>
					<Button
						title='Reset Data'
						onPress={() => {
							click();
							mStats.resetData(props.gameLogic.GameDriver);
						}}
					/>
				</View>
			</View>
		</View>
	);
	function exitSchedual() {
		setSchedual(false);
	}
}

function handleLose(props, setLoading) {
	setLoading(true);
	setTimeout(() => {
		props.navigation.navigate('Conversation', { type: 'lose' });
		setLoading(false);
	}, 3000);
}

function fetchSchedule() {
	return assembleSchedule(characters);
	/* 
		BackEnd Offline
		The below code is commented out because the backend server went out (Exceeded free plan quota). 
		For now we will just get the initial data from local static files 
	*/
	/* return newPromise((res, rej) => {
		fetch('https://coco-game-17308.herokuapp.com/testApi/schedule')
			.then(response => response.json())
			.then(res)
			.catch(rej);
	}); */
}

export default ShiftHub;
