import React from 'react';
import { View } from 'react-native';
import { ActionButton, BodyText, Eyebrow, Panel } from '../uiKit';

function StationOptions(props) {
	var mStats = props.gameLogic.manageStats;
	return (
		<Panel style={styles.panel}>
			<Eyebrow>Switch Station</Eyebrow>
			<BodyText>Choose the node you want to own next.</BodyText>
			<View style={styles.actions}>
				<ActionButton title='Sauce' compact onPress={() => mStats.setPStation('sause')} />
				<ActionButton title='Frier' compact onPress={() => mStats.setPStation('frier')} />
				<ActionButton title='Rice' compact onPress={() => mStats.setPStation('rice')} />
				<ActionButton title='Cancel' compact variant='secondary' onPress={() => props.exit()} />
			</View>
		</Panel>
	);
}

const styles = {
	panel: {
		gap: 12,
	},
	actions: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
};

export default StationOptions;
