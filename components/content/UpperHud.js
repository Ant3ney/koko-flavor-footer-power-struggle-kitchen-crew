import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { StatCard, ui } from '../uiKit';

function UpperHud(props) {
	var gameDriver = props.gameLogic.GameDriver;
	var mStats = props.gameLogic.manageStats;
	const compact = props.compact;

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
		<View style={[styles.hud, compact && styles.hudCompact]}>
			<View style={[styles.hudHeader, compact && styles.hudHeaderCompact]}>
				<Text style={styles.kicker}>Shift HUD</Text>
				<Text style={[styles.clock, compact && styles.clockCompact]}>{formatTime(time)}</Text>
			</View>
			<View style={[styles.stats, compact && styles.statsCompact]}>
				{compact ? (
					<>
						<MiniStat label='Power' value={power} accent={ui.red} />
						<MiniStat label='Station Effectiveness' value={effectivness} accent={ui.orange} />
						<MiniStat label='Energy' value={energy} accent={ui.green} />
						<MiniStat label='Busy' value={busyness} accent={ui.blue} />
						<MiniStat label='Sanity' value={sanity} accent={sanity < 0 ? ui.red : ui.orange} />
					</>
				) : (
					<>
						<StatCard label='Power' value={`${power} / 10,000`} accent={ui.red} style={styles.powerCard} />
						<StatCard label='Station Effectiveness' value={`${effectivness} / 50`} accent={ui.orange} />
						<StatCard label='Skill' value={`${mStats.getPlayer() ? mStats.getPSkill() : 0} / 20`} accent={ui.gold} />
						<StatCard label='Energy' value={energy} accent={ui.green} />
						<StatCard label='Busyness' value={busyness} accent={ui.blue} />
						<StatCard label='Sanity' value={sanity} accent={sanity < 0 ? ui.red : ui.orange} />
					</>
				)}
			</View>
		</View>
	);
}

function MiniStat({ accent, label, value }) {
	return (
		<View style={styles.miniStat}>
			<View style={[styles.miniStatAccent, { backgroundColor: accent }]} />
			<Text style={styles.miniStatLabel} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.35}>
				{label}
			</Text>
			<Text style={styles.miniStatValue}>{value}</Text>
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
		paddingHorizontal: 12,
		paddingTop: 22,
		paddingBottom: 12,
		boxSizing: 'border-box',
	},
	hudCompact: {
		paddingHorizontal: 8,
		paddingTop: 8,
		paddingBottom: 4,
	},
	hudHeader: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10,
		marginBottom: 10,
	},
	hudHeaderCompact: {
		marginBottom: 4,
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
	clockCompact: {
		fontSize: 17,
	},
	stats: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 10,
	},
	statsCompact: {
		flexWrap: 'nowrap',
		gap: 5,
	},
	powerCard: {
		minWidth: 0,
		flexGrow: 1,
	},
	miniStat: {
		flex: 1,
		minWidth: 0,
		minHeight: 44,
		backgroundColor: ui.white,
		borderWidth: 1,
		borderColor: '#FFD08A',
		paddingHorizontal: 5,
		paddingVertical: 5,
		overflow: 'hidden',
	},
	miniStatAccent: {
		position: 'absolute',
		top: 0,
		right: 0,
		width: 24,
		height: 4,
	},
	miniStatLabel: {
		color: ui.muted,
		fontSize: 7,
		lineHeight: 8,
		fontWeight: '900',
		textTransform: 'uppercase',
		minHeight: 16,
	},
	miniStatValue: {
		color: ui.ink,
		fontSize: 14,
		fontWeight: '900',
		marginTop: 4,
	},
};

export default UpperHud;
