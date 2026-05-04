import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import gameReport from '../../GameLogic/ManageStats/GameReport';
import mStats from '../../GameLogic/ManageStats/ManageStats';
import { ActionButton, AppScreen, BodyText, Eyebrow, Panel, ScreenHeader, StatCard, ui } from '../uiKit';
import Character from './Schedule/Character';

function LevelReport(props) {
	const [compiledReport, setCompiledReport] = useState(null);
	const [strongerCharacters] = useState(mStats.getCharactersWhoAreStongerThanPlayer());

	useEffect(() => {
		setCompiledReport(gameReport.getCompiled());
	}, []);

	return (
		<AppScreen scroll>
			<ScreenHeader
				eyebrow='Shift Recap'
				title='Performance Report'
				subtitle='The system has processed your shift. Review the gains and the people still above you.'
			/>
			<View style={styles.grid}>
				<StatCard label='Power Gain' value={compiledReport ? compiledReport.powerGained : 'error'} accent={ui.red} />
				<StatCard
					label='Sanity Change'
					value={compiledReport ? compiledReport.sanityChange : 'error'}
					accent={ui.blue}
				/>
				<StatCard
					label='Last Effectiveness'
					value={compiledReport ? compiledReport.effectivness : 'error'}
					accent={ui.orange}
				/>
				<StatCard
					label='Effectiveness Gain'
					value={compiledReport ? compiledReport.effectivnessGain : 'error'}
					accent={ui.gold}
				/>
				<StatCard
					label='Skillpoints Used'
					value={compiledReport ? compiledReport.skillPointsUsed : 'error'}
					accent={ui.green}
				/>
				<StatCard label='Skill Gained' value={compiledReport ? compiledReport.skillGained : 'error'} accent={ui.green} />
			</View>

			<Panel style={styles.threatPanel}>
				<Eyebrow>Power Threats</Eyebrow>
				<BodyText>Characters who are more powerful than you.</BodyText>
				<ScrollView style={styles.threatList}>
					{!strongerCharacters ? (
						<BodyText>Error</BodyText>
					) : (
						strongerCharacters.map((characterInfo, i) => <Character characterInfo={characterInfo} key={i} />)
					)}
				</ScrollView>
			</Panel>

			<ActionButton
				title='Continue'
				style={styles.nextButton}
				onPress={() => {
					props.simpleNav('Conversation', { type: 'normal' });
				}}
			/>
		</AppScreen>
	);
}

const styles = {
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
		marginBottom: 16,
	},
	threatPanel: {
		gap: 12,
	},
	threatList: {
		maxHeight: 280,
	},
	nextButton: {
		marginTop: 16,
		width: '100%',
		maxWidth: 240,
		alignSelf: 'flex-end',
	},
};

export default LevelReport;
