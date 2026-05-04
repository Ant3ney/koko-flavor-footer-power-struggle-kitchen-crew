import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import upgrades from '../../GameLogic/PresetsAndTemplates/Upgrades';
import { ActionButton, Eyebrow, Panel, ui } from '../uiKit';

var menu = 'Power';

function Upgrade(props) {
	const [currentUpgrades, setCurrentUpgrades] = useState(upgrades.powerUpgrades);

	useEffect(() => {
		if (currentUpgrades === upgrades.powerUpgrades) {
			menu = 'Power';
		} else if (currentUpgrades === upgrades.skillUpgrades) {
			menu = 'Skill';
		} else {
			menu = 'Sanity';
		}
	}, [currentUpgrades]);

	return (
		<View style={styles.overlay}>
			<Panel style={styles.modal}>
				<View style={styles.header}>
					<View>
						<Eyebrow>Upgrade Console</Eyebrow>
						<Text style={styles.title}>{menu} Menu</Text>
					</View>
					<ActionButton title='Exit' compact variant='secondary' onPress={() => props.setUpgrade(false)} />
				</View>

				<ScrollView style={styles.scroll}>
					<View style={styles.upgradeList}>
						{currentUpgrades.map((upgrade, i) => (
							<ActionButton key={i} title={upgrade.title} onPress={upgrade.onPress} variant='secondary' />
						))}
					</View>
				</ScrollView>

				<View style={styles.tabs}>
					<ActionButton title='Power' compact onPress={() => setCurrentUpgrades(upgrades.powerUpgrades)} />
					<ActionButton
						title='Skill'
						compact
						variant='secondary'
						onPress={() => setCurrentUpgrades(upgrades.skillUpgrades)}
					/>
					<ActionButton
						title='Sanity'
						compact
						variant='secondary'
						onPress={() => setCurrentUpgrades(upgrades.sanityUpgrades)}
					/>
				</View>
			</Panel>
		</View>
	);
}

const styles = {
	overlay: {
		position: 'absolute',
		zIndex: 1,
		elevation: 1,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(36, 18, 12, 0.30)',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 12,
	},
	modal: {
		width: '100%',
		maxWidth: 720,
		maxHeight: '82%',
		gap: 14,
		borderColor: ui.gold,
	},
	header: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 12,
	},
	title: {
		color: ui.ink,
		fontSize: 30,
		fontWeight: '900',
	},
	scroll: {
		maxHeight: 360,
	},
	upgradeList: {
		gap: 10,
		paddingVertical: 4,
	},
	tabs: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
};

export default Upgrade;
