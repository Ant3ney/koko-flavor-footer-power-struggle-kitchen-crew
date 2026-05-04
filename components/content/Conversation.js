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
	const tightMobileDialog = compact && aboveFoldMode;
	const avatarFrameHeight = aboveFoldMode
		? compact
			? Math.min(Math.round(width * 1.08), Math.max(240, Math.round(height * 0.42)))
			: Math.min(560, Math.max(340, Math.round(height * 0.52)))
		: compact
		? Math.min(Math.round(width * 0.96), Math.max(210, Math.round(height * 0.34)))
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

	if (compact) {
		return (
			<MobileConversation
				avatar={avatar}
				dialogText={dialogText}
				height={height}
				initials={initials}
				onResponsePress={response => {
					animatePress(pressFeedback);
					update();
					response.onPress();
				}}
				outcomeLabel={outcomeLabel}
				job={job}
				power={power}
				pressFeedback={pressFeedback}
				responses={responses}
				sanity={sanity}
				speakerName={speakerName}
				skill={skill}
				width={width}
				character={character}
			/>
		);
	}

	return (
		<View style={styles.screen}>
			<View style={styles.pressureField} />
			<View style={styles.pressureHotspot} />
			<ScrollView
				style={styles.scroll}
				contentContainerStyle={[styles.scrollContent, compact && styles.scrollContentCompact]}
			>
				<View style={[styles.topRail, compact && styles.topRailCompact, tightMobileDialog && styles.topRailTight]}>
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

				<Animated.View style={[styles.stage, compact && styles.stageCompact, tightMobileDialog && styles.stageTight, panelMotion]}>
					<View style={[styles.characterColumn, compact && styles.characterColumnCompact, tightMobileDialog && styles.characterColumnTight]}>
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
							<View style={[styles.avatarBackplate, compact && styles.avatarBackplateCompact]} />
							{avatar ? (
								<Image
									source={avatar}
									style={[styles.avatarImage, compact && styles.avatarImageCompact, tightMobileDialog && styles.avatarImageTight]}
									resizeMode='contain'
								/>
							) : (
								<View style={[styles.avatarFallback, compact && styles.avatarFallbackCompact, tightMobileDialog && styles.avatarFallbackTight]}>
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

					<View style={[styles.dialogColumn, compact && styles.dialogColumnCompact, tightMobileDialog && styles.dialogColumnTight]}>
						<View style={[styles.speakerHeader, compact && styles.speakerHeaderCompact, tightMobileDialog && styles.speakerHeaderTight]}>
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

						<View style={[styles.dialogBox, compact && styles.dialogBoxCompact, tightMobileDialog && styles.dialogBoxTight]}>
							<View style={styles.dialogAccent} />
							<Text style={[styles.dialogText, compact && styles.dialogTextCompact]}>{dialogText}</Text>
						</View>

						<View style={[styles.responsePanel, compact && styles.responsePanelCompact, tightMobileDialog && styles.responsePanelTight]}>
							<Text style={[styles.responseHeader, compact && styles.responseHeaderCompact, tightMobileDialog && styles.responseHeaderTight]}>DECISION QUEUE</Text>
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

function MobileConversation({
	avatar,
	character,
	dialogText,
	height,
	initials,
	job,
	onResponsePress,
	outcomeLabel,
	power,
	pressFeedback,
	responses,
	sanity,
	speakerName,
	skill,
	width,
}) {
	const viewportHeight = Math.max(height || 0, 620);
	const limitedResponses = responses.length > 0 && responses.length <= 2;
	const responseRows = Math.max(1, responses.length);
	const dialogDockHeight = limitedResponses
		? Math.min(Math.round(viewportHeight * 0.28), 136 + responseRows * 44)
		: Math.round(viewportHeight * 0.44);
	const avatarBottomInset = dialogDockHeight + 10;

	return (
		<View style={[styles.mobileScreen, { minHeight: viewportHeight }]}>
			<View style={styles.pressureField} />
			<View style={[styles.mobileAvatarCanvas, { bottom: avatarBottomInset }]}>
				<View style={styles.mobileAvatarBackplate} />
				{avatar ? (
					<Image source={avatar} style={styles.mobileAvatarImage} resizeMode='contain' />
				) : (
					<View style={styles.mobileAvatarFallback}>
						<Text style={[styles.mobileAvatarFallbackText, { fontSize: Math.max(68, Math.min(120, width * 0.24)) }]}>
							{initials}
						</Text>
					</View>
				)}
			</View>

			<View style={styles.mobileTopBar}>
				<Text style={styles.mobileSceneTitle}>Kitchen Pressure Exchange</Text>
				{outcomeLabel ? (
					<View style={[styles.statusPill, styles.statusPillCompact, outcomeLabel === 'YOU LOSE' && styles.statusPillDanger]}>
						<Text style={[styles.statusPillValue, styles.statusPillValueCompact]}>{outcomeLabel}</Text>
					</View>
				) : null}
			</View>

			<View style={styles.mobileStatRail}>
				<MobileStat label='POWER' value={power} accent={palette.gold} />
				<MobileStat label='SKILL' value={skill} />
				<MobileStat label='SANITY' value={sanity} danger={sanity !== null && sanity < 10} />
				<MobileStat label='ROLE' value={job || '--'} wide />
			</View>

			<View style={styles.mobileBioAction}>
				<CharacterBioButton character={character} tone='dark' compact />
			</View>

			<View style={[styles.mobileDialogDock, { height: dialogDockHeight }]}>
				<View style={styles.mobileSpeakerHeader}>
					<Text style={styles.mobileSpeakerKicker}>ACTIVE CHARACTER</Text>
					<Text style={styles.mobileSpeakerName}>{speakerName}</Text>
				</View>

				<ScrollView style={styles.mobileDialogScroll} contentContainerStyle={styles.mobileDialogScrollContent}>
					<View style={[styles.dialogBox, styles.mobileDialogBox]}>
						<View style={styles.dialogAccent} />
						<Text style={[styles.dialogText, styles.mobileDialogText]}>{dialogText}</Text>
					</View>

					<View style={styles.mobileResponsePanel}>
						{responses.length ? (
							responses.map((response, i) => (
								<ResponseButton
									key={i}
									index={i}
									title={response.title}
									feedback={pressFeedback}
									compact
									onPress={() => onResponsePress(response)}
								/>
							))
						) : (
							<View style={styles.emptyResponse}>
								<Text style={styles.emptyResponseText}>Awaiting response data</Text>
							</View>
						)}
					</View>
				</ScrollView>
			</View>
		</View>
	);
}

function MobileStat({ accent, danger, label, value, wide }) {
	return (
		<View style={[styles.mobileStatBlock, wide && styles.mobileStatBlockWide, danger && styles.mobileStatBlockDanger]}>
			<Text style={[styles.mobileStatLabel, accent && { color: accent }]}>{label}</Text>
			<Text style={styles.mobileStatValue}>{value === null || value === undefined ? '--' : value}</Text>
		</View>
	);
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
	mobileScreen: {
		flex: 1,
		width: '100%',
		backgroundColor: palette.black,
		overflow: 'hidden',
		position: 'relative',
	},
	mobileAvatarCanvas: {
		position: 'absolute',
		top: 28,
		right: 0,
		bottom: 0,
		left: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#170F0E',
		overflow: 'hidden',
	},
	mobileAvatarBackplate: {
		position: 'absolute',
		width: '118%',
		height: '72%',
		bottom: '2%',
		borderRadius: 999,
		backgroundColor: palette.red,
		opacity: 0.5,
	},
	mobileAvatarImage: {
		position: 'absolute',
		top: 32,
		right: 0,
		bottom: 18,
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: 1,
	},
	mobileAvatarFallback: {
		position: 'absolute',
		top: 32,
		right: 0,
		bottom: 18,
		left: 0,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: palette.orange,
		zIndex: 1,
	},
	mobileAvatarFallbackText: {
		color: palette.white,
		fontWeight: '900',
	},
	mobileTopBar: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 4,
		elevation: 4,
		minHeight: 28,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 8,
		paddingHorizontal: 6,
		backgroundColor: 'rgba(18, 18, 18, 0.86)',
		borderBottomWidth: 1,
		borderBottomColor: '#3C251F',
	},
	mobileSceneTitle: {
		flex: 1,
		minWidth: 0,
		color: palette.white,
		fontSize: 12,
		fontWeight: '900',
	},
	mobileStatRail: {
		position: 'absolute',
		top: 36,
		left: 8,
		right: 44,
		zIndex: 5,
		elevation: 5,
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 4,
	},
	mobileStatBlock: {
		minWidth: 54,
		maxWidth: 86,
		borderWidth: 1,
		borderColor: '#6E4435',
		backgroundColor: 'rgba(18, 12, 11, 0.86)',
		paddingVertical: 3,
		paddingHorizontal: 5,
	},
	mobileStatBlockWide: {
		flex: 1,
		minWidth: 80,
		maxWidth: 132,
	},
	mobileStatBlockDanger: {
		borderColor: palette.red,
		backgroundColor: 'rgba(55, 8, 6, 0.9)',
	},
	mobileStatLabel: {
		color: '#F3D9B6',
		fontSize: 8,
		lineHeight: 10,
		fontWeight: '900',
	},
	mobileStatValue: {
		color: palette.white,
		fontSize: 14,
		lineHeight: 17,
		fontWeight: '900',
		textTransform: 'uppercase',
	},
	mobileBioAction: {
		position: 'absolute',
		top: 36,
		right: 8,
		zIndex: 5,
		elevation: 5,
		width: 28,
		alignItems: 'center',
	},
	mobileDialogDock: {
		position: 'absolute',
		left: 6,
		right: 6,
		bottom: 6,
		zIndex: 6,
		elevation: 6,
		backgroundColor: 'rgba(23, 16, 15, 0.94)',
		borderWidth: 2,
		borderColor: '#3C251F',
		padding: 5,
		boxShadow: '0 -18px 42px rgba(0, 0, 0, 0.34)',
	},
	mobileSpeakerHeader: {
		flexShrink: 0,
		marginBottom: 4,
	},
	mobileSpeakerKicker: {
		color: palette.orange,
		fontSize: 8,
		lineHeight: 10,
		fontWeight: '900',
	},
	mobileSpeakerName: {
		color: palette.white,
		fontSize: 16,
		lineHeight: 19,
		fontWeight: '900',
	},
	mobileDialogScroll: {
		flexShrink: 1,
	},
	mobileDialogScrollContent: {
		gap: 4,
	},
	mobileDialogBox: {
		marginTop: 0,
		minHeight: 60,
		paddingHorizontal: 8,
		paddingVertical: 7,
		borderLeftWidth: 5,
	},
	mobileDialogText: {
		fontSize: 14,
		lineHeight: 18,
	},
	mobileResponsePanel: {
		gap: 4,
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
		paddingHorizontal: 4,
		paddingVertical: 4,
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
	topRailTight: {
		marginBottom: 4,
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
		gap: 5,
	},
	stageTight: {
		gap: 4,
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
		position: 'relative',
		flexDirection: 'column',
		gap: 0,
		padding: 4,
	},
	characterColumnTight: {
		padding: 2,
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
		position: 'absolute',
		top: 8,
		left: 8,
		zIndex: 2,
		elevation: 2,
		width: 66,
		flexShrink: 0,
		paddingVertical: 3,
		paddingHorizontal: 5,
		backgroundColor: 'rgba(40, 19, 15, 0.86)',
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
		fontSize: 17,
		lineHeight: 20,
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
		width: '100%',
		flex: 0,
		minHeight: 0,
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
	avatarBackplateCompact: {
		width: '78%',
		height: '78%',
		borderRadius: 999,
		bottom: '-16%',
	},
	avatarImage: {
		width: '100%',
		height: '100%',
		zIndex: 1,
	},
	avatarImageCompact: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
	},
	avatarImageTight: {
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
		width: '100%',
		height: '100%',
		borderRadius: 0,
		marginBottom: 0,
		zIndex: 1,
		alignSelf: 'stretch',
		flex: 1,
	},
	avatarFallbackTight: {
		minWidth: '100%',
		minHeight: '100%',
	},
	avatarFallbackText: {
		color: palette.white,
		fontSize: 42,
		fontWeight: '900',
	},
	avatarFallbackTextCompact: {
		fontSize: 56,
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
		position: 'absolute',
		top: 8,
		right: 8,
		zIndex: 2,
		elevation: 2,
		width: 28,
		justifyContent: 'center',
		alignSelf: 'auto',
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
		padding: 6,
		flexShrink: 1,
	},
	dialogColumnTight: {
		padding: 5,
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
		paddingBottom: 4,
	},
	speakerHeaderTight: {
		borderBottomWidth: 0,
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
		marginTop: 5,
		minHeight: 78,
		paddingHorizontal: 8,
		paddingVertical: 7,
		borderLeftWidth: 5,
	},
	dialogBoxTight: {
		minHeight: 66,
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
		marginTop: 5,
		gap: 4,
	},
	responsePanelTight: {
		marginTop: 4,
	},
	responseHeader: {
		color: palette.gold,
		fontSize: 12,
		fontWeight: '900',
	},
	responseHeaderCompact: {
		fontSize: 9,
	},
	responseHeaderTight: {
		display: 'none',
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
