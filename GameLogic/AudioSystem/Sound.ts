import { Howl } from 'howler';
import sounds from './sounds';
import Settings from './SettingsType';
import { brand } from 'expo-device';
import { Audio } from 'expo-av';

type Update = {
	action: string;
	name?: string;
	settings?: Settings;
	fade?: {
		from: number;
		to: number;
		duration: number;
	};
};

type Player = 'howler' | 'expo';

export default class Sound {
	constructor(name: string, settings?: Settings) {
		this.load(name, settings);
	}

	/**
	 * It loads a sound file and plays it.
	 * @param {string} name - The name of the sound to play.
	 */
	run(name: string, settings?: Settings): void {
		this.load(name, settings);
		this.play();
	}

	/**
	 * Plays the currently loaded sound file.
	 * @param {string} [name] - The name of the sound to play. If not specified, the last sound loaded
	 * will be played.
	 */
	play(nameOrSetting?: string | Settings, settings?: Settings): void {
		this.pause();
		if (nameOrSetting && typeof nameOrSetting === 'string') this.load(nameOrSetting);

		this.updates.push({
			action: 'play',
			settings: getDecidedSettingFromNameAndSettings(nameOrSetting, settings),
		});
		this.update();
	}
	/**
	 * The function pauses the current sound
	 * @param {string} [name] - If a name is passed in, it will load the file of that name then
	 * pause the sound immediately.
	 */
	pause(name?: string): void {
		if (name) this.load(name);

		this.updates.push({
			action: 'pause',
		});
		this.update();
	}

	/**
	 * It loads the name of the audio file.
	 * @param {string} name - The name of the audio file to load.
	 */
	load(name: string, settings?: Settings): void {
		this.updates.push({
			action: 'load',
			name,
			settings,
		});
		this.update();
	}

	transitionTo(name: string, settings?: Settings) {
		let transition = settings?.transition
			? settings.transition
			: {
					from: 1,
					to: 0,
					duration: 1500,
					postFrom: 0,
					postTo: 1,
					postDuration: 1500,
			  };

		this.updates.push({
			action: 'fade',
			fade: {
				from: transition.from,
				to: transition.to,
				duration: transition.duration,
			},
		});
		this.load(name);
		this.updates.push({
			action: 'play',
			settings: {
				fade: {
					from: transition.postFrom,
					to: transition.postTo,
					duration: transition.postDuration,
				},
				loop: settings?.loop,
			},
		});

		this.update();
	}

	musicTransitionTo(name: string) {
		this.transitionTo(name, {
			transition: {
				from: 0.15,
				to: 0,
				duration: 1500,
				postFrom: 0,
				postTo: 0.15,
				postDuration: 1500,
			},
			loop: true,
		});
	}

	stop() {
		this.updates = [];
		this.corePause();
	}

	//Private properties and methods.
	howler: any = null;
	expoAudio: any = null;
	updates: Update[] = [];
	updateing: boolean = false;
	env: string = determineEnvironment();
	player: Player = getPlayerFromENV(this.env);
	async update(): Promise<void> {
		if (this.updateing) return;
		this.updateing = true;

		for (let i = 0; i < this.updates.length; i += 0) {
			switch (this.updates[i].action) {
				case 'play':
					await this.corePlay(this.updates[i].settings);
					break;
				case 'pause':
					await this.corePause();
					break;
				case 'load':
					await this.coreLoad(this.updates[i].name, this.updates[i].settings);
					break;
				case 'fade':
					if (!this.updates[i]?.fade?.from) return updateObjectForFadeActionIsNotDefinedError();
					await this.coreFade(
						//@ts-ignore
						this.updates[i].fade.from,
						//@ts-ignore
						this.updates[i].fade.to,
						//@ts-ignore
						this.updates[i].fade.duration
					);
					break;
				default:
					console.error(`Unknown action: ${this.updates[i].action}`);
					break;
			}
			this.updates.splice(0, 1);
		}
		this.updateing = false;
	}
	async corePlay(settings?: Settings): Promise<void> {
		await this[`${this.player}Play`](settings);
	}
	async howlerPlay(settings?: Settings) {
		if (!this.howler) return unavalibleHowlerError();
		if (settings?.loop) this.howler.loop(settings?.loop);
		this.howler.play();
		if (settings?.volume || settings?.volume === 0) this.howler.volume(settings?.volume);
		if (settings?.fade) this.howler.fade(settings.fade.from, settings.fade.to, settings.fade.duration);
	}
	async expoPlay(settings?: Settings) {
		if (!this.expoAudio) return unavalibleExpoAudioError();
		console.log('settings: ', this.expoAudio);
		const volume =
			settings?.volume || settings?.volume === 0 ? settings.volume : settings?.fade?.to ? settings.fade.to : 1;
		await this.expoAudio.setStatusAsync({
			shouldPlay: true,
			isLooping: settings?.loop,
			volume,
		});
	}
	async corePause() {
		await this[`${this.player}Pause`]();
	}
	async howlerPause() {
		if (!this.howler) return unavalibleHowlerError();
		this.howler.pause();
	}
	async expoPause() {
		if (!this.expoAudio) return unavalibleExpoAudioError();
		await this.expoAudio.pauseAsync();
	}
	async coreLoad(name: string | undefined, settings?: Settings): Promise<void> {
		if (!name) return nameNotPassedintoUpdateError();
		const soundFile = sounds[name];
		if (!soundFile) return unavalibleSoundFileError(name);

		await this[`${this.player}Load`](name);
	}
	howlerLoad(name: string) {
		const soundFile = sounds[name];
		if (this.howler) this.corePause();
		this.howler = new Howl({
			src: [soundFile],
		});
	}
	async expoLoad(name: string) {
		if (this.expoAudio) await this.expoAudio.pauseAsync();
		const soundFile = sounds[name];
		const expoSound = await Audio.Sound.createAsync(soundFile);
		this.expoAudio = expoSound.sound;
	}
	async coreFade(from: number, to: number, duration: number) {
		await this[`${this.player}Fade`](from, to, duration);
	}
	async howlerFade(from: number, to: number, duration: number) {
		if (!this.howler) return unavalibleHowlerError();
		return new Promise<void>(res => {
			this.howler.fade(from, to, duration);
			this.howler.on('fade', function () {
				res();
			});
		});
	}
	async expoFade(from: number, to: number, duration: number) {
		if (!this.expoAudio) return unavalibleExpoAudioError();
		console.log('transition to audio level:', to);
		await this.expoAudio.setVolumeAsync(to);
	}
}

function determineEnvironment(): string {
	switch (brand) {
		case null:
			return 'html';
		default:
			return 'native';
	}
}

function getPlayerFromENV(env: string): Player {
	switch (env) {
		case 'html':
			return 'howler';
		case 'native':
			return 'expo';
		default:
			return 'expo';
	}
}

function getDecidedSettingFromNameAndSettings(
	nameOrSetting: string | Settings | undefined,
	settings: Settings | undefined
): Settings | undefined {
	if (nameOrSetting && typeof nameOrSetting !== 'string') {
		return nameOrSetting;
	} else return settings;
}

function unavalibleExpoAudioError() {
	console.error('Expo audio is not defined or is not avalible.');
}

function updateObjectForFadeActionIsNotDefinedError() {
	console.error('Update object for fade action is not defined.');
}

function nameNotPassedintoUpdateError() {
	console.error('Name was not pushed into update array.');
}

function unavalibleSoundFileError(name: string) {
	console.error(`Sound of ${name} was not found.`);
}

function unavalibleHowlerError() {
	console.error('Howler is not defined or is not avalible.');
}
