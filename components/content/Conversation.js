import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import gamelogic from '../../GameLogic/GameLogic';
import { getAvatarImage } from './avatarImages';
import CharacterBioButton from './CharacterBio';

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
	const { width, height } = useWindowDimensions();
	const entrance = useRef(new Animated.Value(0)).current;
	const pulse = useRef(new Animated.Value(0)).current;
	const pressFeedback = useRef(new Animated.Value(1)).current;
	const compact = width <= 680 || height <= 720;

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
	const aboveFoldMode = responses.length > 0 && responses.length <= 2;
	// When there are only 1-2 responses we try to keep everything above the fold.
	// In that mode the avatar should dominate the layout.
	const avatarFrameHeight = aboveFoldMode
		? compact
			? Math.min(240, Math.max(150, Math.round(height * 0.32)))
			: Math.min(560, Math.max(340, Math.round(height * 0.52)))
		: null;
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
			<ScrollView
				style={styles.scroll}
				contentContainerStyle={[styles.scrollContent, compact && styles.scrollContentCompact]}
			>
				<View style={[styles.topRail, compact && styles.topRailCompact]}>
					<View style={styles.sceneTitleWrap}>
						<Text style={[styles.sceneTitle, compact && styles.sceneTitleCompact]}>Kitchen Pressure Exchange</Text>
					</View>
					{outcomeLabel ? (
						<View
							style={[
								styles.statusPill,
								outcomeLabel === 'YOU LOSE' && styles.statusPillDanger,
								compact && styles.statusPillCompact,
							]}
						>
							<Text style={[styles.statusPillValue, compact && styles.statusPillValueCompact]}>{outcomeLabel}</Text>
						</View>
					) : null}
				</View>

				<Animated.View style={[styles.stage, compact && styles.stageCompact, panelMotion]}>
					<View style={[styles.characterColumn, compact && styles.characterColumnCompact]}>
						<View style={[styles.powerBeacon, compact && styles.powerBeaconCompact]}>
							<Animated.View style={[styles.powerBeaconGlow, pulseMotion]} />
							<Text style={[styles.powerBeaconLabel, compact && styles.powerBeaconLabelCompact]}>POWER</Text>
							<Text style={[styles.powerBeaconValue, compact && styles.powerBeaconValueCompact]}>
								{power === null ? '--' : power}
							</Text>
						</View>

						<View
							style={[
								styles.avatarFrame,
								compact && styles.avatarFrameCompact,
								avatarFrameHeight ? { height: avatarFrameHeight } : null,
							]}
						>
							<View style={styles.avatarBackplate} />
							{avatar ? (
								<Image source={avatar} style={styles.avatarImage} resizeMode='contain' />
							) : (
								<View style={[styles.avatarFallback, compact && styles.avatarFallbackCompact]}>
									<Text style={[styles.avatarFallbackText, compact && styles.avatarFallbackTextCompact]}>
										{initials}
									</Text>
								</View>
							)}
						</View>

						<View style={[styles.statStrip, compact && styles.statStripCompact]}>
							<Stat label='SKILL' value={skill} />
							<Stat label='SANITY' value={sanity} danger={sanity !== null && sanity < 10} />
							<Stat label='ROLE' value={job || '--'} />
						</View>
						<View style={[styles.bioAction, compact && styles.bioActionCompact]}>
							<CharacterBioButton character={character} tone='dark' compact={compact} />
						</View>
					</View>

					<View style={[styles.dialogColumn, compact && styles.dialogColumnCompact]}>
						<View style={[styles.speakerHeader, compact && styles.speakerHeaderCompact]}>
							<View style={styles.speakerCopy}>
								<Text style={[styles.speakerKicker, compact && styles.speakerKickerCompact]}>ACTIVE CHARACTER</Text>
								<Text style={[styles.speakerName, compact && styles.speakerNameCompact]}>{speakerName}</Text>
							</View>
							<View style={[styles.signalStack, compact && styles.signalStackCompact]}>
								<View style={styles.signalDot} />
								<View style={styles.signalDotDim} />
								<View style={styles.signalDotDim} />
							</View>
						</View>

						<View style={[styles.dialogBox, compact && styles.dialogBoxCompact]}>
							<View style={styles.dialogAccent} />
							<Text style={[styles.dialogText, compact && styles.dialogTextCompact]}>{dialogText}</Text>
						</View>

						<View style={[styles.responsePanel, compact && styles.responsePanelCompact]}>
							<Text style={[styles.responseHeader, compact && styles.responseHeaderCompact]}>DECISION QUEUE</Text>
							{responses.length ? (
								responses.map((response, i) => (
									<ResponseButton
										key={i}
										index={i}
										title={response.title}
										feedback={pressFeedback}
										compact={compact}
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
			</ScrollView>
		</View>
	);

	function update() {
		setDialog(dialog);
		updateTo(updater ? false : true);
	}
}

function ResponseButton({ compact, feedback, index, onPress, title }) {
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
				style={[styles.responseButton, compact && styles.responseButtonCompact, pressed && styles.responseButtonPressed]}
			>
				<View style={[styles.responseIndex, compact && styles.responseIndexCompact]}>
					<Text style={[styles.responseIndexText, compact && styles.responseIndexTextCompact]}>{index + 1}</Text>
				</View>
				<Text style={[styles.responseText, compact && styles.responseTextCompact]}>{title}</Text>
				<Text style={[styles.responseArrow, compact && styles.responseArrowCompact]}>&gt;</Text>
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
	const avatarKey = character?.getAvatar ? character.getAvatar() : character?.avatar;
	if (avatarKey === 'Unknown') {
		return '?';
	}
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
	},
	scroll: {
		flex: 1,
		zIndex: 1,
	},
	scrollContent: {
		flexGrow: 1,
		paddingHorizontal: 24,
		paddingVertical: 22,
		justifyContent: 'space-between',
		boxSizing: 'border-box',
	},
	scrollContentCompact: {
		paddingHorizontal: 6,
		paddingVertical: 6,
		justifyContent: 'flex-start',
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
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 12,
		marginBottom: 18,
	},
	topRailCompact: {
		gap: 6,
		marginBottom: 6,
	},
	sceneTitleWrap: {
		flex: 1,
		minWidth: 0,
	},
	sceneTitle: {
		color: palette.white,
		fontSize: 28,
		fontWeight: '900',
	},
	sceneTitleCompact: {
		fontSize: 13,
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
	statusPillCompact: {
		minWidth: 70,
		paddingHorizontal: 8,
		paddingVertical: 4,
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
	statusPillValueCompact: {
		fontSize: 10,
	},
	stage: {
		width: '100%',
		maxWidth: 1180,
		alignSelf: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 18,
	},
	stageCompact: {
		flexWrap: 'wrap',
		alignItems: 'stretch',
		gap: 6,
	},
	characterColumn: {
		width: '100%',
		maxWidth: 330,
		flexGrow: 1,
		backgroundColor: palette.panel,
		borderWidth: 2,
		borderColor: '#3C251F',
		padding: 18,
		justifyContent: 'space-between',
		boxShadow: '0 18px 50px rgba(0, 0, 0, 0.36)',
	},
	characterColumnCompact: {
		width: '100%',
		maxWidth: '100%',
		flexGrow: 0,
		flexShrink: 0,
		flexDirection: 'row',
		alignItems: 'stretch',
		gap: 6,
		padding: 6,
	},
	powerBeacon: {
		borderWidth: 2,
		borderColor: palette.gold,
		backgroundColor: '#28130F',
		paddingVertical: 12,
		paddingHorizontal: 14,
		overflow: 'hidden',
	},
	powerBeaconCompact: {
		width: 74,
		flexShrink: 0,
		paddingVertical: 4,
		paddingHorizontal: 6,
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
	powerBeaconLabelCompact: {
		fontSize: 8,
	},
	powerBeaconValue: {
		color: palette.gold,
		fontSize: 42,
		fontWeight: '900',
		lineHeight: 48,
	},
	powerBeaconValueCompact: {
		fontSize: 19,
		lineHeight: 23,
	},
	avatarFrame: {
		height: 220,
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginVertical: 16,
		backgroundColor: '#170F0E',
		borderWidth: 1,
		borderColor: '#483026',
		overflow: 'hidden',
	},
	avatarFrameCompact: {
		flex: 1,
		height: 86,
		marginVertical: 0,
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
	avatarFallbackCompact: {
		width: 58,
		height: 58,
		borderRadius: 29,
		marginBottom: 14,
	},
	avatarFallbackText: {
		color: palette.white,
		fontSize: 42,
		fontWeight: '900',
	},
	avatarFallbackTextCompact: {
		fontSize: 24,
	},
	statStrip: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	statStripCompact: {
		display: 'none',
	},
	bioAction: {
		alignItems: 'center',
		marginTop: 12,
	},
	bioActionCompact: {
		width: 28,
		justifyContent: 'center',
		alignSelf: 'stretch',
		marginTop: 0,
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
		minWidth: 280,
		backgroundColor: '#17100F',
		borderWidth: 2,
		borderColor: '#3C251F',
		padding: 20,
		boxShadow: '0 18px 50px rgba(0, 0, 0, 0.42)',
	},
	dialogColumnCompact: {
		width: '100%',
		minWidth: 0,
		padding: 8,
		flexShrink: 1,
	},
	speakerHeader: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderBottomColor: '#3C251F',
		paddingBottom: 14,
	},
	speakerHeaderCompact: {
		paddingBottom: 5,
	},
	speakerCopy: {
		flex: 1,
		minWidth: 0,
	},
	speakerKicker: {
		color: palette.orange,
		fontSize: 11,
		fontWeight: '900',
	},
	speakerKickerCompact: {
		fontSize: 8,
	},
	speakerName: {
		color: palette.white,
		fontSize: 28,
		fontWeight: '900',
		marginTop: 3,
	},
	speakerNameCompact: {
		fontSize: 16,
		marginTop: 1,
	},
	signalStack: {
		flexDirection: 'row',
		gap: 6,
	},
	signalStackCompact: {
		display: 'none',
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
	dialogBoxCompact: {
		marginTop: 6,
		minHeight: 92,
		paddingHorizontal: 9,
		paddingVertical: 8,
		borderLeftWidth: 5,
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
		fontSize: 21,
		lineHeight: 30,
		fontWeight: '800',
	},
	dialogTextCompact: {
		fontSize: 14,
		lineHeight: 18,
	},
	responsePanel: {
		marginTop: 18,
		gap: 10,
	},
	responsePanelCompact: {
		marginTop: 6,
		gap: 5,
	},
	responseHeader: {
		color: palette.gold,
		fontSize: 12,
		fontWeight: '900',
	},
	responseHeaderCompact: {
		fontSize: 9,
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
	responseButtonCompact: {
		minHeight: 38,
		paddingHorizontal: 7,
		paddingVertical: 5,
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
	responseIndexCompact: {
		width: 24,
		height: 24,
		marginRight: 7,
	},
	responseIndexText: {
		color: palette.white,
		fontSize: 15,
		fontWeight: '900',
	},
	responseIndexTextCompact: {
		fontSize: 12,
	},
	responseText: {
		flex: 1,
		color: palette.white,
		fontSize: 17,
		lineHeight: 23,
		fontWeight: '800',
	},
	responseTextCompact: {
		fontSize: 13,
		lineHeight: 17,
	},
	responseArrow: {
		color: palette.gold,
		fontSize: 28,
		fontWeight: '900',
		marginLeft: 12,
	},
	responseArrowCompact: {
		fontSize: 18,
		marginLeft: 6,
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
