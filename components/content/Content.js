import React from 'react';
import { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import UpperHud from './UpperHud';
import Kitchen from './Kitchen';
import LowerHud from './LowerHud';

function Content(props) {
	const { width, height } = useWindowDimensions();
	const compact = width <= 680 || height <= 760;

	return (
		<View style={styles.screen}>
			<View style={styles.bgTop} />
			<View style={styles.bgBottom} />
			<View style={styles.content}>
				<UpperHud gameLogic={props.gameLogic} compact={compact} />
				<Kitchen gameLogic={props.gameLogic} navigation={props.navigation} simpleNav={props.simpleNav} compact={compact} />
				{compact ? null : (
					<LowerHud gameLogic={props.gameLogic} navigation={props.navigation} simpleNav={props.simpleNav} compact={compact} />
				)}
			</View>
			<GrimeOverlay gameLogic={props.gameLogic} />
		</View>
	);
}

function GrimeOverlay({ gameLogic }) {
	const mStats = gameLogic.manageStats;
	const [cleanliness, setCleanliness] = useState(mStats.getPlayer() ? mStats.getPCleanliness() : 500);
	const grime = getGrimeAmount(cleanliness);

	useEffect(() => {
		mStats.onDataChange(() => {
			setCleanliness(mStats.getPCleanliness());
		}, 'grimeOverlay');
	}, []);

	return (
		<View pointerEvents='none' style={[styles.grimeOverlay, { opacity: 0.08 + grime * 0.34 }]}>
			<View style={[styles.grimeWash, { opacity: 0.18 + grime * 0.28 }]} />
			<View style={[styles.grimeSmearTop, { opacity: 0.1 + grime * 0.34 }]} />
			<View style={[styles.grimeSmearBottom, { opacity: 0.08 + grime * 0.32 }]} />
			<View style={[styles.grimeSpeckles, { opacity: 0.16 + grime * 0.45 }]} />
			<View style={[styles.grimeSpecklesAlt, { opacity: 0.08 + grime * 0.34 }]} />
		</View>
	);
}

function getGrimeAmount(cleanliness) {
	const clean = typeof cleanliness === 'number' ? cleanliness : 500;
	return Math.max(0, Math.min(1, (500 - clean) / 520));
}

const styles = {
	screen: {
		flex: 1,
		minHeight: '100%',
		backgroundColor: '#FFF4DD',
		overflow: 'hidden',
	},
	content: {
		flex: 1,
		zIndex: 1,
	},
	bgTop: {
		position: 'absolute',
		top: -160,
		right: -160,
		width: 420,
		height: 420,
		borderRadius: 210,
		backgroundColor: '#FFD45A',
		opacity: 0.18,
	},
	bgBottom: {
		position: 'absolute',
		bottom: -180,
		left: -140,
		width: 450,
		height: 450,
		borderRadius: 225,
		backgroundColor: '#F28A3A',
		opacity: 0.14,
	},
	grimeOverlay: {
		position: 'absolute',
		zIndex: 30,
		elevation: 30,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		overflow: 'hidden',
	},
	grimeWash: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: '#3B2416',
	},
	grimeSmearTop: {
		position: 'absolute',
		top: -40,
		left: -30,
		width: '72%',
		height: 150,
		borderRadius: 75,
		backgroundColor: '#2D1A12',
		transform: [{ rotate: '-9deg' }],
	},
	grimeSmearBottom: {
		position: 'absolute',
		right: -60,
		bottom: -20,
		width: '78%',
		height: 190,
		borderRadius: 95,
		backgroundColor: '#4B2A18',
		transform: [{ rotate: '8deg' }],
	},
	grimeSpeckles: {
		position: 'absolute',
		top: 26,
		left: 22,
		width: 150,
		height: 150,
		borderRadius: 75,
		backgroundColor: '#1D120D',
		boxShadow:
			'42px 18px 0 -66px #1D120D, 96px 42px 0 -62px #1D120D, 206px 82px 0 -64px #1D120D, 288px 26px 0 -65px #1D120D, 336px 116px 0 -63px #1D120D, 48px 246px 0 -64px #1D120D, 176px 304px 0 -66px #1D120D, 288px 354px 0 -64px #1D120D',
	},
	grimeSpecklesAlt: {
		position: 'absolute',
		right: 36,
		bottom: 32,
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: '#6A3A1D',
		boxShadow:
			'-54px -42px 0 -50px #6A3A1D, -132px -88px 0 -49px #6A3A1D, -236px -30px 0 -51px #6A3A1D, -326px -122px 0 -50px #6A3A1D, -36px -230px 0 -52px #6A3A1D, -188px -278px 0 -50px #6A3A1D',
	},
};

export default Content;
