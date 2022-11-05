import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import basic from '../../Styles/basics';
import upper from '../../Styles/upperHud';

function UpperHud(props) {
	//Caching
	var gameDriver = props.gameLogic.GameDriver;
	var mStats = props.gameLogic.manageStats;

	const [power, setPower] = useState(mStats.getPlayer() ? mStats.getPPower() : 0);
	const [effectivness, setEffectivness] = useState(mStats.getPlayer() ? mStats.getPEffectivness() : 0);
	const [skillPoints, setSkillPoints] = useState(mStats.getPlayer() ? mStats.getPSkillPoints() : 0);
	const [energy, setEnergy] = useState(mStats.getPlayer() ? mStats.getPEnergy() : 0);
	const [time, setTime] = useState(mStats.getTime());
	const [station, setStation] = useState(mStats.getPStation());
	const [busyness, setBusyness] = useState(mStats.getBusyness());
	const [sanity, setSanity] = useState(mStats.getPSanity());

	useEffect(() => {
		//manage stats event listener will take charge of this in the future
		mStats.onDataChange(() => {
			//Conditions are removed because state canot be compared in event listener due to how state works and closures
			setPower(mStats.getPPower());
			setEffectivness(mStats.getPEffectivness());
			setSkillPoints(mStats.getPSkillPoints());
			setEnergy(mStats.getPEnergy());
			setTime(mStats.getTime());
			setStation(mStats.getPStation());
			setBusyness(mStats.getBusyness());
			setSanity(mStats.getPSanity());
		}, 'upperHud');
		gameDriver.on('tic', () => {
			setTime(mStats.getTime());
		});
	}, []);

	return (
		<View style={{ ...basic.gridContainer, ...upper.container }}>
			<Text style={basic.textAlignCenter}>Status</Text>

			<View style={basic.gridRow}>
				<Text style={basic.gridSCol2}>Power: {power} / 10,000</Text>
				<Text style={basic.gridSCol2}>Effectiveness: {effectivness} / 50</Text>
			</View>

			<View style={basic.gridRow}>
				<Text style={basic.gridSCol2}>Skill: {mStats.getPlayer() ? mStats.getPSkill() : 0} / 20</Text>
				{/* <Text style={basic.gridSCol2}>SkillPoints: {skillPoints}</Text> */}
				<Text style={basic.gridSCol2}>
					Time:{' '}
					{Math.floor(time / 100) +
						':' +
						(time % 100 < 10 ? '0' : '') +
						(time % 100) +
						' ' +
						(Math.floor(time / 100) === 11 ? 'am' : 'pm')}
				</Text>
			</View>

			<View style={basic.gridRow}>
				<Text style={basic.gridSCol2}>Energy: {energy}</Text>
				<Text style={basic.gridSCol2}>Busyness: {busyness}</Text>
			</View>
			<View style={basic.gridRow}>
				{/* <Text style={basic.gridSCol2}>Station: {station}</Text> */}
				<Text style={basic.gridSCol2}>Sanity: {sanity}</Text>
			</View>

			{/* <View style={basic.gridRow}>
				
			</View> */}
		</View>
	);

	function getPower() {
		return power;
	}
}

export default UpperHud;
