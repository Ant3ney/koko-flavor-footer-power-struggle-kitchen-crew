import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { click } from '../../../GameLogic/AudioSystem';
import { ActionButton, Eyebrow, Panel, ui } from '../../uiKit';
import Character from './Character';

function Screen(props) {
	const [schedule, setSchedule] = useState([]);

	useEffect(() => {
		if (props) {
			setSchedule(props.schedule);
		}
	}, []);

	return (
		<View style={styles.overlay}>
			<Panel style={styles.modal}>
				<View style={styles.header}>
					<View>
						<Eyebrow>Crew Schedule</Eyebrow>
						<Text style={styles.title}>
							{props.day.toString().slice(0, 1).toUpperCase() + props.day.toString().slice(1)}
						</Text>
					</View>
					<ActionButton
						title='Back'
						compact
						variant='secondary'
						onPress={() => {
							click();
							props.exitSchedual();
						}}
					/>
				</View>
				<ScrollView style={styles.list}>
					{schedule.map((characterInfo, i) => (
						<Character characterInfo={characterInfo} key={i} />
					))}
				</ScrollView>
			</Panel>
		</View>
	);
}

const styles = {
	overlay: {
		position: 'absolute',
		zIndex: 10,
		elevation: 10,
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(36, 18, 12, 0.34)',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 12,
	},
	modal: {
		width: '100%',
		maxWidth: 760,
		maxHeight: '86%',
		borderColor: ui.orange,
		boxSizing: 'border-box',
	},
	header: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 12,
		marginBottom: 14,
	},
	title: {
		color: ui.ink,
		fontSize: 26,
		fontWeight: '900',
	},
	list: {
		maxHeight: 500,
		flexShrink: 1,
	},
};

export default Screen;
