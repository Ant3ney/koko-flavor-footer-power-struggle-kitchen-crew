import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Text, View } from 'react-native';

const icon = require('../assets/icon.webp');

const palette = {
	cream: '#FFF4DD',
	creamDeep: '#FFE2B8',
	orange: '#F28A3A',
	orangeSoft: '#FFB46E',
	gold: '#FFD45A',
	red: '#B73522',
	ink: '#24120C',
	brown: '#5B2B19',
	white: '#FFFCF6',
};

function Loading() {
	const [dots, setDots] = useState('');
	const float = useRef(new Animated.Value(0)).current;
	const spin = useRef(new Animated.Value(0)).current;
	const glow = useRef(new Animated.Value(0)).current;
	const loadSweep = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const dotInterval = setInterval(() => {
			setDots(current => (current.length >= 3 ? '' : `${current}.`));
		}, 420);

		const floatLoop = Animated.loop(
			Animated.sequence([
				Animated.timing(float, {
					toValue: 1,
					duration: 1200,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
				Animated.timing(float, {
					toValue: 0,
					duration: 1200,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
			])
		);

		const spinLoop = Animated.loop(
			Animated.timing(spin, {
				toValue: 1,
				duration: 4200,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		);

		const glowLoop = Animated.loop(
			Animated.sequence([
				Animated.timing(glow, {
					toValue: 1,
					duration: 900,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
				Animated.timing(glow, {
					toValue: 0,
					duration: 900,
					easing: Easing.inOut(Easing.quad),
					useNativeDriver: true,
				}),
			])
		);

		const sweepLoop = Animated.loop(
			Animated.sequence([
				Animated.timing(loadSweep, {
					toValue: 1,
					duration: 1650,
					easing: Easing.inOut(Easing.cubic),
					useNativeDriver: true,
				}),
				Animated.timing(loadSweep, {
					toValue: 0,
					duration: 250,
					easing: Easing.out(Easing.quad),
					useNativeDriver: true,
				}),
			])
		);

		floatLoop.start();
		spinLoop.start();
		glowLoop.start();
		sweepLoop.start();

		return () => {
			clearInterval(dotInterval);
			floatLoop.stop();
			spinLoop.stop();
			glowLoop.stop();
			sweepLoop.stop();
		};
	}, [float, glow, loadSweep, spin]);

	const floatStyle = {
		transform: [
			{
				translateY: float.interpolate({
					inputRange: [0, 1],
					outputRange: [0, -10],
				}),
			},
			{
				scale: float.interpolate({
					inputRange: [0, 1],
					outputRange: [1, 1.025],
				}),
			},
		],
	};

	const ringStyle = {
		transform: [
			{
				rotate: spin.interpolate({
					inputRange: [0, 1],
					outputRange: ['0deg', '360deg'],
				}),
			},
		],
	};

	const glowStyle = {
		opacity: glow.interpolate({
			inputRange: [0, 1],
			outputRange: [0.42, 0.78],
		}),
		transform: [
			{
				scale: glow.interpolate({
					inputRange: [0, 1],
					outputRange: [1, 1.08],
				}),
			},
		],
	};

	const sweepStyle = {
		transform: [
			{
				translateX: loadSweep.interpolate({
					inputRange: [0, 1],
					outputRange: [-220, 220],
				}),
			},
		],
	};

	return (
		<View style={styles.screen}>
			<View style={styles.sunWash} />
			<View style={styles.warmPanel} />
			<View style={styles.softOrbLeft} />
			<View style={styles.softOrbRight} />

			<View style={styles.content}>
				<Animated.View style={[styles.logoStage, floatStyle]}>
					<Animated.View style={[styles.logoGlow, glowStyle]} />
					<Animated.View style={[styles.logoRing, ringStyle]}>
						<View style={styles.ringDashTop} />
						<View style={styles.ringDashBottom} />
					</Animated.View>
					<View style={styles.logoPlate}>
						<Image source={icon} style={styles.logo} resizeMode='contain' />
					</View>
				</Animated.View>

				<View style={styles.copyBlock}>
					<Text style={styles.brand}>Flavor Fodder</Text>
					<div id='loading-text' style={styles.loadingText}>
						Loading kitchen systems
					</div>
					<Text style={styles.loadingDots}>{dots}</Text>
				</View>

				<View style={styles.progressShell}>
					<View style={styles.progressTrack}>
						<Animated.View style={[styles.progressSweep, sweepStyle]} />
					</View>
					<View style={styles.progressMeta}>
						<Text style={styles.metaText}>Power</Text>
						<Text style={styles.metaText}>Crew</Text>
						<Text style={styles.metaText}>Pressure</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = {
	screen: {
		flex: 1,
		minHeight: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: palette.cream,
		overflow: 'hidden',
		padding: 24,
	},
	sunWash: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: palette.cream,
	},
	warmPanel: {
		position: 'absolute',
		width: '82%',
		maxWidth: 980,
		height: '72%',
		maxHeight: 650,
		backgroundColor: '#FFE8C2',
		borderWidth: 1,
		borderColor: '#FFD08A',
		boxShadow: '0 28px 90px rgba(183, 53, 34, 0.16)',
	},
	softOrbLeft: {
		position: 'absolute',
		left: -110,
		bottom: -90,
		width: 360,
		height: 360,
		borderRadius: 180,
		backgroundColor: palette.orangeSoft,
		opacity: 0.28,
	},
	softOrbRight: {
		position: 'absolute',
		right: -100,
		top: -110,
		width: 420,
		height: 420,
		borderRadius: 210,
		backgroundColor: palette.gold,
		opacity: 0.24,
	},
	content: {
		width: '100%',
		maxWidth: 680,
		alignItems: 'center',
		zIndex: 1,
	},
	logoStage: {
		width: 220,
		height: 220,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 30,
	},
	logoGlow: {
		position: 'absolute',
		width: 210,
		height: 210,
		borderRadius: 105,
		backgroundColor: palette.gold,
		boxShadow: '0 0 55px rgba(242, 138, 58, 0.38)',
	},
	logoRing: {
		position: 'absolute',
		width: 220,
		height: 220,
		borderRadius: 110,
		borderWidth: 2,
		borderColor: '#D95E2D',
	},
	ringDashTop: {
		position: 'absolute',
		top: -3,
		left: 82,
		width: 56,
		height: 7,
		backgroundColor: palette.white,
	},
	ringDashBottom: {
		position: 'absolute',
		bottom: -3,
		left: 82,
		width: 56,
		height: 7,
		backgroundColor: palette.white,
	},
	logoPlate: {
		width: 164,
		height: 164,
		borderRadius: 82,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: palette.white,
		borderWidth: 6,
		borderColor: '#FFD88E',
		boxShadow: '0 18px 34px rgba(91, 43, 25, 0.22)',
	},
	logo: {
		width: 118,
		height: 118,
	},
	copyBlock: {
		alignItems: 'center',
		minHeight: 120,
	},
	brand: {
		color: palette.ink,
		fontSize: 44,
		fontWeight: '900',
		textAlign: 'center',
		marginBottom: 14,
	},
	loadingText: {
		color: palette.brown,
		fontSize: 20,
		fontWeight: '800',
		textAlign: 'center',
		minHeight: 30,
	},
	loadingDots: {
		color: palette.red,
		fontSize: 30,
		fontWeight: '900',
		lineHeight: 34,
		minHeight: 38,
		textAlign: 'center',
	},
	progressShell: {
		width: '100%',
		maxWidth: 520,
		marginTop: 10,
	},
	progressTrack: {
		height: 12,
		backgroundColor: '#FFDCA4',
		borderWidth: 1,
		borderColor: '#F0A352',
		overflow: 'hidden',
	},
	progressSweep: {
		width: 220,
		height: '100%',
		backgroundColor: palette.orange,
		boxShadow: '0 0 24px rgba(242, 138, 58, 0.58)',
	},
	progressMeta: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 12,
	},
	metaText: {
		color: palette.brown,
		fontSize: 11,
		fontWeight: '900',
		textTransform: 'uppercase',
	},
};

export default Loading;
