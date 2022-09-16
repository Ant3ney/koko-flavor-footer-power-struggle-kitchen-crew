import AsyncStorage from '@react-native-async-storage/async-storage';

/* This object is a wraper for AsyncStorage.
It is needed because using the defalt AsyncStorage dose not format the data compleatly conviently and 
can easily get errors */
const localStorage = {
	getObject: async (key: string): Promise<object | null> => {
		if (!AsyncStorage?.getItem) return null;
		const rawStorage = await AsyncStorage.getItem(key);
		if (!rawStorage) return null;
		const object = JSON.parse(rawStorage);
		return object ? object : null;
	},
	set: async (key: string, value: object | string) => {
		if (!AsyncStorage?.setItem) return;
		//@ts-ignore
		let valueBuffer: string = typeof value === 'string' ? value : JSON.stringify(value);
		await AsyncStorage.setItem(key, valueBuffer);
		const test = await AsyncStorage.getItem(key);
		console.log('just saved:', test);
	},
};

export default localStorage;
