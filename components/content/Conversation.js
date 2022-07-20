import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import basic from '../../Styles/basics';
import gamelogic from '../../GameLogic/GameLogic';
import util from '../../Utilities';

let conversation = gamelogic.conversation;

function Conversation(props) {
	const [dialog, setDialog] = useState(null);
	const [updater, updateTo] = useState(false);

	useEffect(() => {
		console.log('prosp', props);
		conversation.awake({
			navigation: props.navigation,
			type: props.type,
			setPlayer: player => {
				setDialog(player);
			},
		});
		setDialog(conversation.getPlayer());
	}, []);

	return (
		/* Stops re-rendering after two click */
		<View style={basic.testContainer}>
			<Text>{dialog ? dialog.getName() : 'Subject01'}</Text>
			<Text>{dialog ? dialog.getDialog() : 'Message'}</Text>
			{dialog && dialog.getResponses() && dialog.getResponses().length ? (
				dialog.getResponses().map((response, i) => (
					<Button
						key={i}
						title={response.title}
						onPress={() => {
							update();
							response.onPress();
						}}
					/>
				))
			) : (
				<Text>"responses"</Text>
			)}
		</View>
	);
	function update() {
		setDialog(dialog);
		updateTo(updater ? false : true);
	}
	function getDialogName() {
		return dialog.getCharacter().name.getLast().length > 0
			? dialog.getCharacter().name.get()
			: dialog.getCharacter().name.getFirst();
	}
	function getTypeFromProps() {}
}

export default Conversation;
