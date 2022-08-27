type Settings = {
	loop?: boolean;
	fade?: {
		from: number;
		to: number;
		duration: number;
	};
	volume?: number;
	transition?: {
		to: number;
		from: number;
		duration: number;
		postFrom: number;
		postTo: number;
		postDuration: number;
	};
	duck?: boolean;
};

export default Settings;
