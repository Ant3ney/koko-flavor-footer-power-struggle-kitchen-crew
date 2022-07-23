import { Howl } from 'howler';
import sounds from './sounds';
import Settings from './SettingsType';

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

	transitionTo(name: string) {
		this.updates.push({
			action: 'fade',
			fade: {
				from: 1,
				to: 0,
				duration: 1500,
			},
		});
		this.load(name);
		this.updates.push({
			action: 'play',
			settings: {
				fade: {
					from: 0,
					to: 1,
					duration: 10500,
				},
			},
		});

		this.update();
	}
	stop() {
		this.updates = [];
		this.corePause();
	}

	//Private properties and methods.
	howler: any = null;
	updates: Update[] = [];
	updateing: boolean = false;
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
					console.log('started waiting for fade');
					await this.coreFade(
						//@ts-ignore
						this.updates[i].fade.from,
						//@ts-ignore
						this.updates[i].fade.to,
						//@ts-ignore
						this.updates[i].fade.duration
					);
					console.log('finished waiting for fade');
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
		if (!this.howler) return unavalibleHowlerError();
		if (settings?.loop) this.howler.loop(settings?.loop);

		console.log('coreplay settings', settings);
		this.howler.play();
		if (settings?.fade) this.howler.fade(settings.fade.from, settings.fade.to, settings.fade.duration);
	}
	corePause() {
		if (!this.howler) return unavalibleHowlerError();
		this.howler.pause();
	}
	coreLoad(name: string | undefined, settings?: Settings): void {
		if (!name) return nameNotPassedintoUpdateError();
		const soundFile = sounds[name];
		if (this.howler) this.corePause();
		if (!soundFile) return unavalibleSoundFileError(name);
		this.howler = new Howl({
			src: [soundFile],
		});
	}
	async coreFade(from: number, to: number, duration: number) {
		if (!this.howler) return unavalibleHowlerError();
		return new Promise<void>(res => {
			console.log('closer start');

			this.howler.fade(from, to, duration);
			this.howler.on('fade', function () {
				console.log('closer end');
				res();
			});
		});
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
