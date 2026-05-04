import React, { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { getAvatarImage } from './avatarImages';
import { ui } from '../uiKit';

function CharacterBioButton({ character, compact, tone = 'light' }) {
	const [visible, setVisible] = useState(false);
	if (!character) {
		return null;
	}

	return (
		<>
			<Pressable
				accessibilityLabel={'Open bio for ' + getCharacterName(character)}
				onPress={() => setVisible(true)}
				style={[styles.bioButton, compact && styles.bioButtonCompact, tone === 'dark' && styles.bioButtonDark]}
			>
				<Text style={[styles.bioButtonText, tone === 'dark' && styles.bioButtonTextDark]}>i</Text>
			</Pressable>
			<CharacterBioModal character={character} visible={visible} onClose={() => setVisible(false)} />
		</>
	);
}

function CharacterBioModal({ character, onClose, visible }) {
	const avatar = getAvatarImage(character);
	const stats = getStats(character);

	return (
		<Modal animationType='fade' transparent visible={visible} onRequestClose={onClose}>
			<View style={styles.overlay}>
				<View style={styles.modal}>
					<View style={styles.header}>
						<View style={styles.identity}>
							<View style={styles.avatarShell}>
								{avatar ? (
									<Image source={avatar} style={styles.avatar} resizeMode='contain' />
								) : (
									<Text style={styles.avatarText}>{getInitials(character)}</Text>
								)}
							</View>
							<View style={styles.titleCopy}>
								<Text style={styles.kicker}>Character Bio</Text>
								<Text style={styles.name}>{getCharacterName(character)}</Text>
								<Text style={styles.role}>{getRole(character)}</Text>
							</View>
						</View>
						<Pressable onPress={onClose} style={styles.closeButton}>
							<Text style={styles.closeText}>X</Text>
						</Pressable>
					</View>

					<ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
						<View style={styles.bioSection}>
							<Text style={styles.sectionTitle}>Profile</Text>
							<BioLine label='Age' value={getValue(character, 'getAge', 'age')} />
							<BioLine label='Gender' value={getValue(character, 'getGender', 'gender')} />
							<BioLine label='Personality' value={getValue(character, 'getPersonality', 'personality')} />
							<BioLine label='Wealth' value={getValue(character, 'getWealth', 'wealth')} />
							<BioLine label='Station' value={formatStation(getValue(character, 'getCurrentStation', 'currentStation'))} />
						</View>

						<View style={styles.bioSection}>
							<Text style={styles.sectionTitle}>Stats</Text>
							<View style={styles.statGrid}>
								{stats.map(stat => (
									<View key={stat.label} style={styles.statCard}>
										<Text style={styles.statLabel}>{stat.label}</Text>
										<Text style={styles.statValue}>{stat.value}</Text>
									</View>
								))}
							</View>
						</View>

						<View style={styles.bioSection}>
							<Text style={styles.sectionTitle}>Voice</Text>
							<BioLine label='Catch Phrase' value={getValue(character, 'getCatchPhrase', 'catchPhrase')} />
							<BioLine label='Denied Phrase' value={getValue(character, 'getDeniedPhrase', 'deniedPhrase')} />
						</View>
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
}

function BioLine({ label, value }) {
	return (
		<View style={styles.bioLine}>
			<Text style={styles.bioLabel}>{label}</Text>
			<Text style={styles.bioValue}>{formatValue(value)}</Text>
		</View>
	);
}

function getStats(character) {
	return [
		{ label: 'Power', value: getValue(character, 'getPower', 'power') },
		{ label: 'Skill', value: getValue(character, 'getSkill', 'skill') },
		{ label: 'Skill Pts', value: getValue(character, 'getSkillPoints', 'skillPoints') },
		{ label: 'Effect', value: getValue(character, 'getEffectivness', 'effectivness') },
		{ label: 'Sanity', value: getValue(character, 'getSanity', 'sanity') },
		{ label: 'Happy', value: getValue(character, 'getHappyness', 'happyness') },
		{ label: 'Respect', value: getValue(character, 'getRespectability', 'respectability') },
		{ label: 'Clean', value: getValue(character, 'getCleanliness', 'cleanliness') },
		{ label: 'Anger', value: getValue(character, 'getAnger', 'anger') },
	].map(stat => ({ ...stat, value: formatValue(stat.value) }));
}

function getValue(character, getter, fallbackKey) {
	if (!character) {
		return null;
	}
	if (character[getter]) {
		return character[getter]();
	}
	if (character[fallbackKey] !== undefined) {
		return character[fallbackKey];
	}
	if (character.character && character.character[fallbackKey] !== undefined) {
		return character.character[fallbackKey];
	}
	if (character.person && character.person[fallbackKey] !== undefined) {
		return character.person[fallbackKey];
	}
	return null;
}

function getCharacterName(character) {
	if (character?.name?.get) {
		return character.name.get();
	}
	if (typeof character?.name === 'string') {
		return character.name;
	}
	const first = character?.person?.name?.firstName;
	const last = character?.person?.name?.lastName;
	if (first || last) {
		return `${first || ''} ${last || ''}`.trim();
	}
	return 'Unknown';
}

function getRole(character) {
	if (character?.role) {
		return character.role;
	}
	const job = getValue(character, 'getJob', 'job');
	return formatValue(job);
}

function getInitials(character) {
	return getCharacterName(character)
		.split(' ')
		.map(part => part.slice(0, 1))
		.join('')
		.slice(0, 2)
		.toUpperCase();
}

function formatStation(station) {
	if (station === 'sause') {
		return 'Sauce';
	}
	if (station === 'frier') {
		return 'Fryer';
	}
	return station;
}

function formatValue(value) {
	if (value === null || value === undefined || value === '') {
		return '--';
	}
	return value.toString();
}

const styles = {
	bioButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: ui.ink,
		borderWidth: 1,
		borderColor: ui.gold,
	},
	bioButtonCompact: {
		width: 26,
		height: 26,
		borderRadius: 13,
	},
	bioButtonDark: {
		backgroundColor: '#170F0E',
		borderColor: '#F2C94C',
	},
	bioButtonText: {
		color: ui.white,
		fontSize: 16,
		fontWeight: '900',
	},
	bioButtonTextDark: {
		color: '#F2C94C',
	},
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(36, 18, 12, 0.52)',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 12,
	},
	modal: {
		width: '100%',
		maxWidth: 720,
		maxHeight: '88%',
		backgroundColor: ui.white,
		borderWidth: 2,
		borderColor: ui.orange,
		padding: 18,
		gap: 14,
	},
	header: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		gap: 12,
	},
	identity: {
		flex: 1,
		minWidth: 0,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		gap: 12,
	},
	avatarShell: {
		width: 82,
		height: 82,
		backgroundColor: ui.cream,
		borderWidth: 1,
		borderColor: '#FFD08A',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	avatar: {
		width: 82,
		height: 82,
	},
	avatarText: {
		color: ui.orangeDeep,
		fontSize: 30,
		fontWeight: '900',
	},
	titleCopy: {
		flex: 1,
		minWidth: 0,
	},
	kicker: {
		color: ui.orangeDeep,
		fontSize: 11,
		fontWeight: '900',
		textTransform: 'uppercase',
	},
	name: {
		color: ui.ink,
		fontSize: 28,
		fontWeight: '900',
	},
	role: {
		color: ui.muted,
		fontSize: 13,
		fontWeight: '900',
		textTransform: 'uppercase',
		marginTop: 3,
	},
	closeButton: {
		width: 38,
		height: 38,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: ui.red,
	},
	closeText: {
		color: ui.white,
		fontSize: 16,
		fontWeight: '900',
	},
	scroll: {
		flexShrink: 1,
	},
	scrollContent: {
		gap: 12,
	},
	bioSection: {
		backgroundColor: ui.cream,
		borderWidth: 1,
		borderColor: '#FFDCA4',
		padding: 12,
		gap: 8,
	},
	sectionTitle: {
		color: ui.ink,
		fontSize: 13,
		fontWeight: '900',
		textTransform: 'uppercase',
	},
	bioLine: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		gap: 12,
	},
	bioLabel: {
		color: ui.muted,
		fontSize: 13,
		fontWeight: '900',
	},
	bioValue: {
		flex: 1,
		minWidth: 140,
		color: ui.brown,
		fontSize: 13,
		fontWeight: '800',
		textAlign: 'right',
	},
	statGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	statCard: {
		minWidth: 96,
		flexGrow: 1,
		backgroundColor: ui.white,
		borderWidth: 1,
		borderColor: '#FFD08A',
		paddingHorizontal: 10,
		paddingVertical: 8,
	},
	statLabel: {
		color: ui.muted,
		fontSize: 10,
		fontWeight: '900',
		textTransform: 'uppercase',
	},
	statValue: {
		color: ui.ink,
		fontSize: 18,
		fontWeight: '900',
		marginTop: 4,
	},
};

export default CharacterBioButton;
