import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import basic from '../Styles/basics';

function Loading() {
	return (
		<View style={{ ...basic.testContainer, display: 'flex', flexDirection: 'row' }}>
			<Text>Loading</Text>
			<Dots />
		</View>
	);
}

function Dots() {
	const dots = useRef(0);

	useEffect(() => {
		const intervalVID = setInterval(() => {
			if (dots.current === 3) dots.current = 0;
			dots.current = dots.current + 1;
			const dotsEle = document.querySelector('#dots');
			dotsEle.innerHTML = (() => {
				let dotString = '';
				for (let i = 0; i < dots.current; i++) {
					dotString += '.';
				}
				return dotString;
			})();
		}, 500);
		return () => {
			clearInterval(intervalVID);
		};
	}, []);

	return <div id='dots'></div>;
}

export default Loading;
