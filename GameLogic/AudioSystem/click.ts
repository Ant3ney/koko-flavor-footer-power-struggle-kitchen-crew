import Sound from './Sound';

let clickSound = new Sound('click01');

export default function click() {
	clickSound.play();
}
