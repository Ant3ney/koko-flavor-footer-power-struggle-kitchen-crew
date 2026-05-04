import React from 'react';
import { Image, View } from 'react-native';
import { click } from '../../GameLogic/AudioSystem';
import { ActionButton, AppScreen, BodyText, Panel, Title } from '../uiKit';
import loadAllAudio from './loadAllAudio';

const homeLogo = require('../../assets/logo.png');

function PressStart(props) {
	return (
		<AppScreen>
			<View style={styles.hero}>
				<View style={styles.logoFrame}>
					<Image source={homeLogo} style={styles.logo} resizeMode='contain' />
				</View>
				<View style={styles.copy}>
					<Title center size={46}>
						Flavor Fodder
					</Title>
					<BodyText center style={styles.subtitle}>
						Build power, survive the shift, and keep the kitchen system from turning against you.
					</BodyText>
				</View>
				<Panel style={styles.ctaPanel}>
					<ActionButton
						title='Start Shift'
						onPress={async () => {
							click();
							props.navigation.navigate('Loading');
							await loadAllAudio(updateLoadingText);
							props.navigation.navigate('Main Menu');
						}}
					/>
				</Panel>
			</View>
		</AppScreen>
	);

	function updateLoadingText(soundLoadingContext) {
		const loadingTextEle = document.getElementById('loading-text');
		if (!loadingTextEle) {
			return;
		}
		if (soundLoadingContext.cached) {
			loadingTextEle.innerHTML = 'Loading cached kitchen systems';
			return;
		}
		loadingTextEle.innerHTML = `Loading asset ${soundLoadingContext.currentSound} out of ${soundLoadingContext.max}`;
	}
}

const styles = {
	hero: {
		minHeight: '72vh',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 22,
	},
	logoFrame: {
		width: '100%',
		maxWidth: 720,
		aspectRatio: 16 / 9,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFFCF6',
		borderWidth: 4,
		borderColor: '#FFD88E',
		boxShadow: '0 22px 55px rgba(91, 43, 25, 0.20)',
		overflow: 'hidden',
	},
	logo: {
		width: '100%',
		height: '100%',
	},
	copy: {
		alignItems: 'center',
		width: '100%',
		maxWidth: 620,
	},
	subtitle: {
		marginTop: 12,
		maxWidth: 560,
	},
	ctaPanel: {
		width: '100%',
		maxWidth: 360,
		padding: 14,
	},
};

export default PressStart;
