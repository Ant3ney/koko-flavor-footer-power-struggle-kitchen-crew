import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';

export const ui = {
	cream: '#FFF4DD',
	creamDeep: '#FFE6BD',
	creamSoft: '#FFF9EE',
	orange: '#F28A3A',
	orangeDeep: '#D55B29',
	gold: '#FFD45A',
	red: '#B73522',
	redDeep: '#7A0000',
	ink: '#24120C',
	brown: '#5B2B19',
	muted: '#8E6145',
	white: '#FFFCF6',
	green: '#267A4A',
	blue: '#2E6E9E',
};

export const gameLogo = require('../assets/icon.webp');

export function AppScreen({ children, scroll, style }) {
	const content = <View style={[styles.screenInner, style]}>{children}</View>;

	return (
		<View style={styles.screen}>
			<View style={styles.sunWash} />
			<View style={styles.orbTop} />
			<View style={styles.orbBottom} />
			{scroll ? (
				<ScrollView contentContainerStyle={styles.scrollContent} style={styles.scroll}>
					{content}
				</ScrollView>
			) : (
				content
			)}
		</View>
	);
}

export function BrandMark({ size = 86 }) {
	return (
		<View style={[styles.logoPlate, { width: size, height: size, borderRadius: size / 2 }]}>
			<Image source={gameLogo} style={{ width: size * 0.68, height: size * 0.68 }} resizeMode='contain' />
		</View>
	);
}

export function Panel({ children, style, tone = 'light' }) {
	return <View style={[styles.panel, tone === 'dark' && styles.panelDark, style]}>{children}</View>;
}

export function Eyebrow({ children, tone = 'orange' }) {
	return <Text style={[styles.eyebrow, tone === 'gold' && styles.eyebrowGold]}>{children}</Text>;
}

export function Title({ children, center, size = 34, style }) {
	return <Text style={[styles.title, center && styles.centerText, { fontSize: size }, style]}>{children}</Text>;
}

export function BodyText({ children, center, style }) {
	return <Text style={[styles.body, center && styles.centerText, style]}>{children}</Text>;
}

export function ActionButton({ title, onPress, disabled, variant = 'primary', compact, style }) {
	return (
		<Pressable
			disabled={disabled}
			onPress={onPress}
			style={({ pressed }) => [
				styles.button,
				variant === 'secondary' && styles.buttonSecondary,
				variant === 'danger' && styles.buttonDanger,
				variant === 'ghost' && styles.buttonGhost,
				compact && styles.buttonCompact,
				disabled && styles.buttonDisabled,
				pressed && !disabled && styles.buttonPressed,
				style,
			]}
		>
			<Text
				style={[
					styles.buttonText,
					variant === 'secondary' && styles.buttonTextSecondary,
					variant === 'ghost' && styles.buttonTextGhost,
					disabled && styles.buttonTextDisabled,
				]}
			>
				{title}
			</Text>
		</Pressable>
	);
}

export function StatCard({ label, value, accent = ui.orange, large, style }) {
	return (
		<View style={[styles.statCard, style]}>
			<View style={[styles.statAccent, { backgroundColor: accent }]} />
			<Text style={styles.statLabel}>{label}</Text>
			<Text style={[styles.statValue, large && styles.statValueLarge]}>{value}</Text>
		</View>
	);
}

export function ScreenHeader({ eyebrow, title, subtitle, children }) {
	return (
		<View style={styles.header}>
			<View style={styles.headerCopy}>
				{eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
				<Title>{title}</Title>
				{subtitle ? <BodyText style={styles.headerSubtitle}>{subtitle}</BodyText> : null}
			</View>
			{children}
		</View>
	);
}

const styles = {
	screen: {
		flex: 1,
		minHeight: '100%',
		backgroundColor: ui.cream,
		overflow: 'hidden',
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		minHeight: '100%',
	},
	screenInner: {
		width: '100%',
		maxWidth: 1180,
		alignSelf: 'center',
		paddingHorizontal: 24,
		paddingVertical: 28,
		zIndex: 1,
	},
	sunWash: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: ui.cream,
	},
	orbTop: {
		position: 'absolute',
		top: -150,
		right: -120,
		width: 390,
		height: 390,
		borderRadius: 195,
		backgroundColor: ui.gold,
		opacity: 0.22,
	},
	orbBottom: {
		position: 'absolute',
		bottom: -170,
		left: -130,
		width: 420,
		height: 420,
		borderRadius: 210,
		backgroundColor: ui.orange,
		opacity: 0.18,
	},
	logoPlate: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: ui.white,
		borderWidth: 4,
		borderColor: '#FFD88E',
		boxShadow: '0 16px 35px rgba(91, 43, 25, 0.18)',
	},
	panel: {
		backgroundColor: 'rgba(255, 252, 246, 0.92)',
		borderWidth: 1,
		borderColor: '#FFD08A',
		padding: 20,
		boxShadow: '0 18px 50px rgba(91, 43, 25, 0.12)',
	},
	panelDark: {
		backgroundColor: ui.ink,
		borderColor: '#6F3924',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 18,
		marginBottom: 22,
	},
	headerCopy: {
		flex: 1,
		minWidth: 0,
	},
	headerSubtitle: {
		maxWidth: 720,
		marginTop: 8,
	},
	eyebrow: {
		color: ui.orangeDeep,
		fontSize: 12,
		fontWeight: '900',
		letterSpacing: 0,
		textTransform: 'uppercase',
		marginBottom: 6,
	},
	eyebrowGold: {
		color: ui.gold,
	},
	title: {
		color: ui.ink,
		fontWeight: '900',
		lineHeight: 40,
	},
	body: {
		color: ui.brown,
		fontSize: 16,
		lineHeight: 23,
		fontWeight: '700',
	},
	centerText: {
		textAlign: 'center',
	},
	button: {
		minHeight: 48,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: ui.orange,
		borderWidth: 1,
		borderColor: ui.orangeDeep,
		paddingHorizontal: 18,
		paddingVertical: 12,
		boxShadow: '0 10px 22px rgba(213, 91, 41, 0.22)',
	},
	buttonSecondary: {
		backgroundColor: ui.white,
		borderColor: '#F0A352',
		boxShadow: '0 8px 18px rgba(91, 43, 25, 0.10)',
	},
	buttonDanger: {
		backgroundColor: ui.red,
		borderColor: ui.redDeep,
	},
	buttonGhost: {
		backgroundColor: 'transparent',
		borderColor: '#E0A56D',
		boxShadow: 'none',
	},
	buttonCompact: {
		minHeight: 38,
		paddingHorizontal: 12,
		paddingVertical: 8,
	},
	buttonPressed: {
		transform: [{ translateY: 1 }, { scale: 0.99 }],
	},
	buttonDisabled: {
		backgroundColor: '#E4C6A1',
		borderColor: '#D0AA82',
		boxShadow: 'none',
	},
	buttonText: {
		color: ui.white,
		fontSize: 15,
		fontWeight: '900',
		textTransform: 'uppercase',
		textAlign: 'center',
	},
	buttonTextSecondary: {
		color: ui.ink,
	},
	buttonTextGhost: {
		color: ui.brown,
	},
	buttonTextDisabled: {
		color: '#9D7C62',
	},
	statCard: {
		minHeight: 84,
		backgroundColor: ui.white,
		borderWidth: 1,
		borderColor: '#FFD08A',
		paddingHorizontal: 14,
		paddingVertical: 12,
		overflow: 'hidden',
	},
	statAccent: {
		position: 'absolute',
		top: 0,
		right: 0,
		width: 56,
		height: 6,
	},
	statLabel: {
		color: ui.muted,
		fontSize: 11,
		fontWeight: '900',
		textTransform: 'uppercase',
	},
	statValue: {
		color: ui.ink,
		fontSize: 22,
		fontWeight: '900',
		marginTop: 8,
	},
	statValueLarge: {
		fontSize: 34,
	},
};
