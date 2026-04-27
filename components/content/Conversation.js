import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Pressable, Text, View } from 'react-native';
import gamelogic from '../../GameLogic/GameLogic';
import { getAvatarImage } from './avatarImages';

let conversation = gamelogic.conversation;

const palette = {
	black: '#121212',
	ink: '#1A1110',
	red: '#7A0000',
	orange: '#E07A2F',
	gold: '#F2C94C',
	white: '#FAFAFA',
	panel: '#221715',
	panelLight: '#2F201B',
	muted: '#D8C8B0',
};

function Conversation(props) {
	const [dialog, setDialog] = useState(null);
	const [updater, updateTo] = useState(false);
	const entrance = useRef(new Animated.Value(0)).current;
	const pulse = useRef(new Animated.Value(0)).current;
	const pressFeedback = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		conversation.awake({
			navigation: props.navigation,
			type: props.type,
			setPlayer: player => {
				setDialog(player);
			},
		});
		setDialog(conversation.getPlayer());
	}, []);

	const character = dialog?.getCharacter ? dialog.getCharacter() : null;
	const dialogText = dialog ? dialog.getDialog() : 'Message';
	const speakerName = dialog ? dialog.getName() : 'Subject01';
	const responses = dialog && dialog.getResponses && dialog.getResponses() ? dialog.getResponses() : [];
	const avatar = getAvatarImage(character);
	const power = character?.getPower ? character.getPower() : null;
	const skill = character?.getSkill ? character.getSkill() : null;
	const sanity = character?.getSanity ? character.getSanity() : null;
	const job = character?.getJob ? character.getJob() : null;
	const initials = getInitials(character, speakerName);
	const outcomeLabel = getOutcomeLabel(props.type);

	useEffect(() => {
		entrance.setValue(0);
		Animated.timing(entrance, {
			toValue: 1,
			duration: 170,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: true,
		}).start();
	}, [dialogText, entrance]);

	useEffect(() => {
		const loop = Animated.loop(
			Animated.sequence([
				Animated.timing(pulse, {
					toValue: 1,
					duration: 900,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
				Animated.timing(pulse, {
					toValue: 0,
					duration: 900,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
			])
		);
		loop.start();
		return () => loop.stop();
	}, [pulse]);

	const panelMotion = {
		opacity: entrance,
		transform: [
			{
				translateY: entrance.interpolate({
					inputRange: [0, 1],
					outputRange: [18, 0],
				}),
			},
			{
				scale: entrance.interpolate({
					inputRange: [0, 1],
					outputRange: [0.98, 1],
				}),
			},
		],
	};

	const pulseMotion = {
		transform: [
			{
				scale: pulse.interpolate({
					inputRange: [0, 1],
					outputRange: [1, 1.035],
				}),
			},
		],
		opacity: pulse.interpolate({
			inputRange: [0, 1],
			outputRange: [0.55, 0.9],
		}),
	};

	return (
		<View style={styles.screen}>
			<View style={styles.pressureField} />
			<View style={styles.pressureHotspot} />
			<View style={styles.topRail}>
				<View>
					<Text style={styles.sceneTitle}>Kitchen Pressure Exchange</Text>
				</View>
				{outcomeLabel ? (
					<View style={[styles.statusPill, outcomeLabel === 'YOU LOSE' && styles.statusPillDanger]}>
						<Text style={styles.statusPillValue}>{outcomeLabel}</Text>
					</View>
				) : null}
			</View>

			<Animated.View style={[styles.stage, panelMotion]}>
				<View style={styles.characterColumn}>
					<View style={styles.powerBeacon}>
						<Animated.View style={[styles.powerBeaconGlow, pulseMotion]} />
						<Text style={styles.powerBeaconLabel}>POWER</Text>
						<Text style={styles.powerBeaconValue}>{power === null ? '--' : power}</Text>
					</View>

					<View style={styles.avatarFrame}>
						<View style={styles.avatarBackplate} />
						{avatar ? (
							<Image source={avatar} style={styles.avatarImage} resizeMode='contain' />
						) : (
							<View style={styles.avatarFallback}>
								<Text style={styles.avatarFallbackText}>{initials}</Text>
							</View>
						)}
					</View>

					<View style={styles.statStrip}>
						<Stat label='SKILL' value={skill} />
						<Stat label='SANITY' value={sanity} danger={sanity !== null && sanity < 10} />
						<Stat label='ROLE' value={job || '--'} />
					</View>
				</View>

				<View style={styles.dialogColumn}>
					<View style={styles.speakerHeader}>
						<View>
							<Text style={styles.speakerKicker}>ACTIVE CHARACTER</Text>
							<Text style={styles.speakerName}>{speakerName}</Text>
						</View>
						<View style={styles.signalStack}>
							<View style={styles.signalDot} />
							<View style={styles.signalDotDim} />
							<View style={styles.signalDotDim} />
						</View>
					</View>

					<View style={styles.dialogBox}>
						<View style={styles.dialogAccent} />
						<Text style={styles.dialogText}>{dialogText}</Text>
					</View>

					<View style={styles.responsePanel}>
						<Text style={styles.responseHeader}>DECISION QUEUE</Text>
						{responses.length ? (
							responses.map((response, i) => (
								<ResponseButton
									key={i}
									index={i}
									title={response.title}
									feedback={pressFeedback}
									onPress={() => {
										animatePress(pressFeedback);
										update();
										response.onPress();
									}}
								/>
							))
						) : (
							<View style={styles.emptyResponse}>
								<Text style={styles.emptyResponseText}>Awaiting response data</Text>
							</View>
						)}
					</View>
				</View>
			</Animated.View>
		</View>
	);

	function update() {
		setDialog(dialog);
		updateTo(updater ? false : true);
	}
}

function ResponseButton({ feedback, index, onPress, title }) {
	const [pressed, setPressed] = useState(false);

	return (
		<Animated.View
			style={[
				styles.responseMotion,
				{
					transform: [
						{
							scale: feedback,
						},
					],
				},
			]}
		>
			<Pressable
				onPress={onPress}
				onPressIn={() => setPressed(true)}
				onPressOut={() => setPressed(false)}
				style={[styles.responseButton, pressed && styles.responseButtonPressed]}
			>
				<View style={styles.responseIndex}>
					<Text style={styles.responseIndexText}>{index + 1}</Text>
				</View>
				<Text style={styles.responseText}>{title}</Text>
				<Text style={styles.responseArrow}>&gt;</Text>
			</Pressable>
		</Animated.View>
	);
}

function Stat({ danger, label, value }) {
	return (
		<View style={[styles.statBlock, danger && styles.statBlockDanger]}>
			<Text style={styles.statLabel}>{label}</Text>
			<Text style={styles.statValue}>{value === null || value === undefined ? '--' : value}</Text>
		</View>
	);
}

function animatePress(value) {
	value.setValue(0.985);
	Animated.spring(value, {
		toValue: 1,
		friction: 4,
		tension: 180,
		useNativeDriver: true,
	}).start();
}

function getInitials(character, speakerName) {
	const first = character?.name?.getFirst ? character.name.getFirst() : speakerName;
	const last = character?.name?.getLast ? character.name.getLast() : '';
	const firstInitial = first ? first.slice(0, 1) : '?';
	const lastInitial = last ? last.slice(0, 1) : '';
	return `${firstInitial}${lastInitial}`.toUpperCase();
}

function getOutcomeLabel(type) {
	if (type === 'win') return 'YOU WIN';
	if (type === 'lose') return 'YOU LOSE';
	return null;
}

const styles = {
	screen: {
		flex: 1,
		minHeight: '100%',
		backgroundColor: palette.black,
		overflow: 'hidden',
		paddingHorizontal: 24,
		paddingVertical: 22,
		justifyContent: 'space-between',
	},
	pressureField: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: palette.ink,
	},
	pressureHotspot: {
		position: 'absolute',
		top: -120,
		right: -120,
		width: 420,
		height: 420,
		borderRadius: 210,
		backgroundColor: palette.red,
		opacity: 0.42,
	},
	topRail: {
		width: '100%',
		maxWidth: 1180,
		alignSelf: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 18,
		zIndex: 1,
	},
	sceneTitle: {
		color: palette.white,
		fontSize: 28,
		fontWeight: '900',
	},
	statusPill: {
		borderWidth: 1,
		borderColor: palette.orange,
		backgroundColor: '#21100D',
		paddingHorizontal: 18,
		paddingVertical: 10,
		minWidth: 118,
		alignItems: 'flex-end',
	},
	statusPillDanger: {
		borderColor: palette.red,
		backgroundColor: '#2A0D0B',
	},
	statusPillValue: {
		color: palette.gold,
		fontSize: 16,
		fontWeight: '900',
		textTransform: 'uppercase',
	},
	stage: {
		width: '100%',
		maxWidth: 1180,
		alignSelf: 'center',
		flexDirection: 'row',
		gap: 18,
		zIndex: 1,
	},
	characterColumn: {
		width: 330,
		backgroundColor: palette.panel,
		borderWidth: 2,
		borderColor: '#3C251F',
		padding: 18,
		justifyContent: 'space-between',
		boxShadow: '0 18px 50px rgba(0, 0, 0, 0.36)',
	},
	powerBeacon: {
		borderWidth: 2,
		borderColor: palette.gold,
		backgroundColor: '#28130F',
		paddingVertical: 12,
		paddingHorizontal: 14,
		overflow: 'hidden',
	},
	powerBeaconGlow: {
		position: 'absolute',
		top: -28,
		right: -18,
		width: 112,
		height: 112,
		borderRadius: 56,
		backgroundColor: palette.gold,
	},
	powerBeaconLabel: {
		color: palette.muted,
		fontSize: 11,
		fontWeight: '900',
	},
	powerBeaconValue: {
		color: palette.gold,
		fontSize: 42,
		fontWeight: '900',
		lineHeight: 48,
	},
	avatarFrame: {
		height: 280,
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginVertical: 16,
		backgroundColor: '#170F0E',
		borderWidth: 1,
		borderColor: '#483026',
		overflow: 'hidden',
	},
	avatarBackplate: {
		position: 'absolute',
		bottom: -60,
		width: 250,
		height: 250,
		borderRadius: 125,
		backgroundColor: palette.orange,
		opacity: 0.24,
	},
	avatarImage: {
		width: '100%',
		height: '100%',
	},
	avatarFallback: {
		width: 138,
		height: 138,
		borderRadius: 69,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: palette.orange,
		marginBottom: 64,
	},
	avatarFallbackText: {
		color: palette.white,
		fontSize: 42,
		fontWeight: '900',
	},
	statStrip: {
		flexDirection: 'row',
		gap: 8,
	},
	statBlock: {
		flex: 1,
		backgroundColor: '#170F0E',
		borderWidth: 1,
		borderColor: '#463129',
		paddingHorizontal: 9,
		paddingVertical: 10,
		minHeight: 58,
	},
	statBlockDanger: {
		borderColor: palette.red,
		backgroundColor: '#2A0D0B',
	},
	statLabel: {
		color: palette.muted,
		fontSize: 9,
		fontWeight: '900',
	},
	statValue: {
		color: palette.white,
		fontSize: 16,
		fontWeight: '900',
		marginTop: 4,
		textTransform: 'uppercase',
	},
	dialogColumn: {
		flex: 1,
		minWidth: 0,
		backgroundColor: '#17100F',
		borderWidth: 2,
		borderColor: '#3C251F',
		padding: 20,
		boxShadow: '0 18px 50px rgba(0, 0, 0, 0.42)',
	},
	speakerHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: '#3C251F',
		paddingBottom: 14,
	},
	speakerKicker: {
		color: palette.orange,
		fontSize: 11,
		fontWeight: '900',
	},
	speakerName: {
		color: palette.white,
		fontSize: 32,
		fontWeight: '900',
		marginTop: 3,
	},
	signalStack: {
		flexDirection: 'row',
		gap: 6,
	},
	signalDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: palette.gold,
	},
	signalDotDim: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: '#5D4035',
	},
	dialogBox: {
		marginTop: 18,
		minHeight: 190,
		backgroundColor: palette.white,
		borderLeftWidth: 8,
		borderLeftColor: palette.orange,
		paddingHorizontal: 22,
		paddingVertical: 20,
		justifyContent: 'center',
	},
	dialogAccent: {
		position: 'absolute',
		top: 0,
		right: 0,
		width: 70,
		height: 8,
		backgroundColor: palette.gold,
	},
	dialogText: {
		color: palette.black,
		fontSize: 24,
		lineHeight: 34,
		fontWeight: '800',
	},
	responsePanel: {
		marginTop: 18,
		gap: 10,
	},
	responseHeader: {
		color: palette.gold,
		fontSize: 12,
		fontWeight: '900',
	},
	responseMotion: {
		width: '100%',
	},
	responseButton: {
		minHeight: 58,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: palette.panelLight,
		borderWidth: 1,
		borderColor: '#5A392E',
		paddingHorizontal: 14,
		paddingVertical: 10,
	},
	responseButtonPressed: {
		backgroundColor: '#3C1D17',
		borderColor: palette.gold,
	},
	responseIndex: {
		width: 34,
		height: 34,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: palette.red,
		marginRight: 12,
	},
	responseIndexText: {
		color: palette.white,
		fontSize: 15,
		fontWeight: '900',
	},
	responseText: {
		flex: 1,
		color: palette.white,
		fontSize: 17,
		lineHeight: 23,
		fontWeight: '800',
	},
	responseArrow: {
		color: palette.gold,
		fontSize: 28,
		fontWeight: '900',
		marginLeft: 12,
	},
	emptyResponse: {
		minHeight: 58,
		justifyContent: 'center',
		backgroundColor: '#211715',
		borderWidth: 1,
		borderColor: '#3C251F',
		paddingHorizontal: 14,
	},
	emptyResponseText: {
		color: palette.muted,
		fontSize: 16,
		fontWeight: '800',
	},
};

export default Conversation;
