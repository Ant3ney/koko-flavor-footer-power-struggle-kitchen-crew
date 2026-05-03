import React from 'react';
import { View } from 'react-native';
import { click } from '../../GameLogic/AudioSystem';
import { ActionButton, AppScreen, BodyText, BrandMark, Eyebrow, Panel, Title } from '../uiKit';
import loadAllAudio from './loadAllAudio';

function PressStart(props) {
	return (
		<AppScreen>
			<View style={styles.hero}>
				<BrandMark size={132} />
				<View style={styles.copy}>
					<Eyebrow>UI-First Kitchen Pressure Sim</Eyebrow>
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
		if (loadingTextEle)
			loadingTextEle.innerHTML = `Loading asset ${soundLoadingContext.currentSound} out of ${soundLoadingContext.max}`;
	}
}

const styles = {
	hero: {
		minHeight: '88vh',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 26,
	},
	copy: {
		alignItems: 'center',
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
