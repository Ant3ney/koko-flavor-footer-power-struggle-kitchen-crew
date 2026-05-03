import React, { useEffect } from 'react';
import { View } from 'react-native';
import { click, music } from '../../../GameLogic/AudioSystem';
import { ActionButton, AppScreen, BodyText, BrandMark, Eyebrow, Panel, StatCard, Title, ui } from '../../uiKit';
import getPopulatedUser from './getPopulatedUser';
import initializeGameLogic from './initializeGameLogic';

function MainMenu(props) {
	useEffect(() => {
		music.play('mainTheme', {
			loop: true,
			volume: 0.15,
		});
	}, []);

	return (
		<AppScreen>
			<View style={styles.menuLayout}>
				<Panel style={styles.heroPanel}>
					<View style={styles.heroTop}>
						<BrandMark size={112} />
						<View style={styles.heroCopy}>
							<Eyebrow>Power Struggle Simulator</Eyebrow>
							<Title size={44}>Flavor Fodder</Title>
							<BodyText style={styles.subtitle}>
								A clean kitchen interface hiding a brutal power economy.
							</BodyText>
						</View>
					</View>
					<View style={styles.statRow}>
						<StatCard label='Priority' value='Power' accent={ui.red} />
						<StatCard label='Pressure' value='Shift' accent={ui.orange} />
						<StatCard label='Goal' value='10,000' accent={ui.gold} />
					</View>
				</Panel>

				<Panel style={styles.actionPanel}>
					<Eyebrow>Command Menu</Eyebrow>
					<ActionButton
						title='Play'
						onPress={async () => {
							click();
							props.navigation.navigate('Loading');
							const initDeps = { user: await getPopulatedUser(), props };
							const receipt = initializeGameLogic(initDeps);
							props.navigation.navigate('Play', {
								type: receipt.interoperateUserForBeginning() ? 'beginning' : null,
							});
						}}
					/>
					<ActionButton
						title='Credits'
						variant='secondary'
						onPress={() => {
							click();
							props.navigation.navigate('Credits');
						}}
					/>
				</Panel>
			</View>
		</AppScreen>
	);
}

const styles = {
	menuLayout: {
		minHeight: '86vh',
		justifyContent: 'center',
		gap: 18,
	},
	heroPanel: {
		padding: 28,
	},
	heroTop: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 22,
	},
	heroCopy: {
		flex: 1,
		minWidth: 0,
	},
	subtitle: {
		marginTop: 10,
	},
	statRow: {
		flexDirection: 'row',
		gap: 12,
		marginTop: 22,
	},
	actionPanel: {
		width: '100%',
		maxWidth: 420,
		alignSelf: 'center',
		gap: 12,
	},
};

export default MainMenu;
