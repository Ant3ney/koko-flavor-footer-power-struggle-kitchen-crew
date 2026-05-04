import React from 'react';
import { ScrollView, View } from 'react-native';
import UpperHud from './UpperHud';
import Kitchen from './Kitchen';
import LowerHud from './LowerHud';

function Content(props) {
	return (
		<View style={styles.screen}>
			<View style={styles.bgTop} />
			<View style={styles.bgBottom} />
			<ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
				<UpperHud gameLogic={props.gameLogic} />
				<Kitchen gameLogic={props.gameLogic} navigation={props.navigation} simpleNav={props.simpleNav} />
				<LowerHud gameLogic={props.gameLogic} navigation={props.navigation} simpleNav={props.simpleNav} />
			</ScrollView>
		</View>
	);
}

const styles = {
	screen: {
		flex: 1,
		minHeight: '100%',
		backgroundColor: '#FFF4DD',
		overflow: 'hidden',
	},
	scroll: {
		flex: 1,
		zIndex: 1,
	},
	scrollContent: {
		flexGrow: 1,
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
};

export default Content;
