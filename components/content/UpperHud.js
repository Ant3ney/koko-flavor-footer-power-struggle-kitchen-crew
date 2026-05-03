import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { StatCard, ui } from '../uiKit';

function UpperHud(props) {
	var gameDriver = props.gameLogic.GameDriver;
	var mStats = props.gameLogic.manageStats;

	const [power, setPower] = useState(mStats.getPlayer() ? mStats.getPPower() : 0);
	const [effectivness, setEffectivness] = useState(mStats.getPlayer() ? mStats.getPEffectivness() : 0);
	const [energy, setEnergy] = useState(mStats.getPlayer() ? mStats.getPEnergy() : 0);
	const [time, setTime] = useState(mStats.getTime());
	const [busyness, setBusyness] = useState(mStats.getBusyness());
	const [sanity, setSanity] = useState(mStats.getPSanity());

	useEffect(() => {
		mStats.onDataChange(() => {
			setPower(mStats.getPPower());
			setEffectivness(mStats.getPEffectivness());
			setEnergy(mStats.getPEnergy());
			setTime(mStats.getTime());
			setBusyness(mStats.getBusyness());
			setSanity(mStats.getPSanity());
		}, 'upperHud');
		gameDriver.on('tic', () => {
			setTime(mStats.getTime());
		});
	}, []);

	return (
		<View style={styles.hud}>
			<View style={styles.hudHeader}>
				<Text style={styles.kicker}>Shift HUD</Text>
				<Text style={styles.clock}>{formatTime(time)}</Text>
			</View>
			<View style={styles.stats}>
				<StatCard label='Power' value={`${power} / 10,000`} accent={ui.red} style={styles.powerCard} />
				<StatCard label='Effectiveness' value={`${effectivness} / 50`} accent={ui.orange} />
				<StatCard label='Skill' value={`${mStats.getPlayer() ? mStats.getPSkill() : 0} / 20`} accent={ui.gold} />
				<StatCard label='Energy' value={energy} accent={ui.green} />
				<StatCard label='Busyness' value={busyness} accent={ui.blue} />
				<StatCard label='Sanity' value={sanity} accent={sanity < 0 ? ui.red : ui.orange} />
			</View>
		</View>
	);
}

function formatTime(time) {
	return (
		Math.floor(time / 100) +
		':' +
		(time % 100 < 10 ? '0' : '') +
		(time % 100) +
		' ' +
		(Math.floor(time / 100) === 11 ? 'am' : 'pm')
	);
}

const styles = {
	hud: {
		width: '100%',
		maxWidth: 1180,
		alignSelf: 'center',
		paddingHorizontal: 24,
		paddingTop: 22,
		paddingBottom: 12,
	},
	hudHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	kicker: {
		color: ui.orangeDeep,
		fontSize: 12,
		fontWeight: '900',
		textTransform: 'uppercase',
	},
	clock: {
		color: ui.ink,
		fontSize: 24,
		fontWeight: '900',
	},
	stats: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10,
	},
	powerCard: {
		minWidth: 220,
	},
};

export default UpperHud;
