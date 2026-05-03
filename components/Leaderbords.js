import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActionButton, AppScreen, BodyText, Panel, ScreenHeader } from './uiKit';

function Leaderbords(props) {
	const navigation = useNavigation();

	return (
		<AppScreen>
			<ScreenHeader eyebrow='Rankings' title='Leaderboards' subtitle='Power rankings are reserved for online play.'>
				<ActionButton
					title='Back'
					variant='secondary'
					compact
					onPress={() => {
						props.gameLogic.GameDriver.possibleGamePlayReturn(true);
						navigation.goBack();
					}}
				/>
			</ScreenHeader>
			<Panel>
				<BodyText>
					Leaderboards will compare power growth, sanity control, and shift efficiency once online services
					return.
				</BodyText>
			</Panel>
		</AppScreen>
	);
}

export default Leaderbords;
