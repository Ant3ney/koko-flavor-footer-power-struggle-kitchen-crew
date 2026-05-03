import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActionButton, AppScreen, BodyText, Panel, ScreenHeader } from './uiKit';

function Share(props) {
	const navigation = useNavigation();

	return (
		<AppScreen>
			<ScreenHeader eyebrow='Network' title='Share' subtitle='Share hooks are staged for a future build.'>
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
					Your current build keeps sharing offline. This page is ready for future invite links, score cards,
					and shift recap exports.
				</BodyText>
			</Panel>
		</AppScreen>
	);
}

export default Share;
