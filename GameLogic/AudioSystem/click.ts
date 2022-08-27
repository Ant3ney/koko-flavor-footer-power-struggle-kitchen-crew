import Sound from './Sound';

/**
 * Plays the click sound.
 */
export default function click() {
	let clickSound = new Sound('click01');
	clickSound.play();
}
