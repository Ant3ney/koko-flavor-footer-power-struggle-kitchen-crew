import React from 'react';
import { Text, View } from 'react-native';
import { ActionButton, ui } from '../uiKit';

function LowerHud(props) {
	const compact = props.compact;
	return (
		<View style={[styles.footer, compact && styles.footerCompact]}>
			{compact ? null : <Text style={styles.status}>System ready. Keep pressure moving.</Text>}
			<View style={styles.actions}>
				<ActionButton
					title='Settings'
					compact
					variant='ghost'
					onPress={() => {
						props.gameLogic.GameDriver.leftGamePlay(true);
						props.navigation.navigate('Settings');
					}}
				/>
			</View>
		</View>
	);
}

const styles = {
	footer: {
		width: '100%',
		maxWidth: 1180,
		alignSelf: 'center',
		paddingHorizontal: 12,
		paddingBottom: 18,
		paddingTop: 6,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 12,
		boxSizing: 'border-box',
	},
	footerCompact: {
		paddingHorizontal: 8,
		paddingBottom: 8,
		paddingTop: 2,
		justifyContent: 'flex-end',
	},
	status: {
		color: ui.muted,
		fontSize: 12,
		fontWeight: '900',
		textTransform: 'uppercase',
	},
	actions: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
};

export default LowerHud;
