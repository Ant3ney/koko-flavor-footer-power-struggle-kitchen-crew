import React from 'react';
import { View } from 'react-native';
import { click } from '../../GameLogic/AudioSystem';
import { ActionButton, BodyText, Eyebrow, Panel } from '../uiKit';

function StationOptions(props) {
	var mStats = props.gameLogic.manageStats;
	const setStation = station => {
		click();
		mStats.setPStation(station);
		if (props.onStationChange) {
			props.onStationChange(station);
		}
		props.exit();
	};
	return (
		<Panel style={styles.panel}>
			<Eyebrow>Switch Station</Eyebrow>
			<BodyText>Choose the node you want to own next.</BodyText>
			<View style={styles.actions}>
				<ActionButton title='Sauce' compact onPress={() => setStation('sause')} />
				<ActionButton title='Fryer' compact onPress={() => setStation('frier')} />
				<ActionButton title='Rice' compact onPress={() => setStation('rice')} />
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
