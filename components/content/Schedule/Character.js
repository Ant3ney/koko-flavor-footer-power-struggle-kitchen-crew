import React from 'react';
import { Image, Text, View } from 'react-native';
import { getAvatarImage } from '../avatarImages';
import { ui } from '../../uiKit';

function Character(props) {
	const avatar = getAvatarImage(props.characterInfo);

	return (
		<View style={styles.card}>
			<View style={styles.avatarShell}>
				{avatar ? (
					<Image source={avatar} style={styles.avatar} resizeMode='contain' />
				) : (
					<Text style={styles.avatarText}>{props.characterInfo.name.getFirst().slice(0, 1)}</Text>
				)}
			</View>
			<View style={styles.copy}>
				<Text style={styles.name}>{props.characterInfo.name.get()}</Text>
				<Text style={styles.role}>{props.characterInfo.getJob()}</Text>
			</View>
			<View style={styles.stats}>
				<Text style={styles.stat}>PWR {props.characterInfo.getPower()}</Text>
				<Text style={styles.stat}>SAN {props.characterInfo.getSanity()}</Text>
			</View>
		</View>
	);
}

const styles = {
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		backgroundColor: '#FFF4DD',
		borderWidth: 1,
		borderColor: '#FFDCA4',
		padding: 10,
		marginBottom: 8,
	},
	avatarShell: {
		width: 54,
		height: 54,
		backgroundColor: ui.white,
		borderWidth: 1,
		borderColor: '#FFD08A',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	avatar: {
		width: 54,
		height: 54,
	},
	avatarText: {
		color: ui.orangeDeep,
		fontSize: 22,
		fontWeight: '900',
	},
	copy: {
		flex: 1,
		minWidth: 0,
	},
	name: {
		color: ui.ink,
		fontSize: 16,
		fontWeight: '900',
	},
	role: {
		color: ui.muted,
		fontSize: 12,
		fontWeight: '900',
		textTransform: 'uppercase',
		marginTop: 2,
	},
	stats: {
		alignItems: 'flex-end',
		gap: 4,
	},
	stat: {
		color: ui.brown,
		fontSize: 12,
		fontWeight: '900',
	},
};

export default Character;
