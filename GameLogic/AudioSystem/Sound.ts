import { Howl } from 'howler';
import sounds from './sounds';
import Settings from './SettingsType';

type Update = {
	action: string;
	name?: string;
	settings?: Settings;
};

export default class Sound {
	constructor(name: string, settings?: Settings) {
		this.load(name);
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
		if (nameOrSetting && typeof nameOrSetting === 'string') this.load(nameOrSetting);

		console.log('decided setting', getDecidedSettingFromNameAndSettings(nameOrSetting, settings));

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
		this.howler.play();
		console.log('loop', settings?.loop, settings);
		this.howler.loop(settings?.loop);
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
}

function getDecidedSettingFromNameAndSettings(
	nameOrSetting: string | Settings | undefined,
	settings: Settings | undefined
): Settings | undefined {
	if (nameOrSetting && typeof nameOrSetting !== 'string') {
		return nameOrSetting;
	} else return settings;
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
