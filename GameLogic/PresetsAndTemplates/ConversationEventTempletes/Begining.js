import mStats from '../../ManageStats/ManageStats';
import Dialog from '../../Conversation/Dialog';
import characters from '../../ManageStats/Characters';
import { music } from '../../AudioSystem';
let staticConversation = {};

var beginingTemplete = (dialogChanged, exit) => {
	var subJect01Obj = mStats.getRandomCharacter();
	var johnTheMan = new characters();
	johnTheMan.characterInit({ name: {}, gender: 'm', personality: 'consistent' }, {});
	var narrator = new characters();
	mStats.setCharacterName(johnTheMan, { first: 'John', last: 'The Manager' });
	mStats.setCharacterName(narrator, { first: 'narrator', last: '' });
	var johnAlvas = mStats.getCharacterWithName('John Alvas');

	return {
		conversation01: [
			{
				dialog: new Dialog(johnTheMan, 'Why?!!?', { emotion: 'Angry' }),
				responses: [
					{
						title: 'next',
						onPress: () => {
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(johnTheMan, 'Why do they all arrive at the same time!!!'),
				responses: [
					{
						title: 'next',
						onPress: () => {
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(narrator, '1 year lator'),
				responses: [
					{
						title: 'next',
						onPress: () => {
							music.play('eventfulShift', { loop: true, volume: 0.15 });
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(johnAlvas, 'You finally got the job. About time!'),
				responses: [
					{
						title: 'next',
						onPress: () => {
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(johnAlvas, 'The kitchen crew has needed a new hire for the last five years!'),
				responses: [
					{
						title: 'next',
						onPress: () => {
							staticConversation.index++;
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(
					johnAlvas,
					'Anyways, when John the Man got transferd, a large void in power formed at our resturant. Now everyones in a mad fight for power!'
				),
				responses: [
					{
						title: 'next',
						onPress: () => {
							staticConversation.index++;
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(
					johnAlvas,
					'You must gain power in order to keep your job. Management here is bloodthirsty, they will fire or demote you at will in order to better secure their power!'
				),
				responses: [
					{
						title: 'next',
						onPress: () => {
							staticConversation.index++;
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(
					johnAlvas,
					'But fortunately for you that whould not be a problem. I can tell by the firey look in your eyes that you plan to become a professional power gainer'
				),
				responses: [
					{
						title: 'next',
						onPress: () => {
							staticConversation.index++;
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(johnAlvas, 'Well you better not try to gain more power than me!'),
				responses: [
					{
						title: 'next',
						onPress: () => {
							staticConversation.index++;
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(johnAlvas, 'Anyway, how dose one obtain power you ask?'),
				responses: [
					{
						title: 'next',
						onPress: () => {
							staticConversation.index++;
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(
					johnAlvas,
					'Good question. Obtaining power is determined by one thing and one thing only. Running an effective station.'
				),
				responses: [
					{
						title: 'next',
						onPress: () => {
							staticConversation.index++;
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(
					johnAlvas,
					'Its not about the connections or the group chats or luck. Its about how effective you run your station dammit!'
				),
				responses: [
					{
						title: 'next',
						onPress: () => {
							staticConversation.index++;
							dialogChanged();
						},
					},
				],
			},
			{
				dialog: new Dialog(
					johnAlvas,
					"And for god sake don't become insane while doing so. Take John the man as an example, working while insane will  hurt your respectability and lead to power loss"
				),
				responses: [
					{
						title: 'next',
						onPress: dialogChanged,
					},
				],
			},
			{
				dialog: new Dialog(
					johnAlvas,
					'Wait! Before you go and start your first day as a cook, Choose an easy shift. You wont gain much power if your skill is cant match the difficulty'
				),
				responses: [
					{
						title: 'next',
						onPress: dialogChanged,
					},
				],
			},
			{
				dialog: new Dialog(johnAlvas, 'May the heart of the Cury be with you!'),
				responses: [
					{
						title: 'next',
						onPress: () => {
							music.pause();
							johnAlvas.voice.pause();
							exit();
						},
					},
				],
			},
		],
	};
};

export default beginingTemplete;
