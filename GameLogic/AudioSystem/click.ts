import Sound from './Sound';

let clickSound = new Sound('click01');

/**
 * Plays the click sound.
 */
export default function click() {
	clickSound.play();
}
