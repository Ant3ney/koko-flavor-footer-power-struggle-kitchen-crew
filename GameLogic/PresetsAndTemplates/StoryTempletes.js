import characters from '../ManageStats/Characters';
import mStats from '../ManageStats/ManageStats';
import Dialog from '../Conversation/Dialog';
import { music } from '../AudioSystem';
let staticConversation = {};
const FIRST_CONVERSATION_PROPERTY = 'conversation01';
const PLAY_MUSIC_SETTINGS = { volume: 0.15, loop: true };

var storyTempletes = [
	(dialogChanged, exit) => {
		var christian = mStats.getCharacterWithName('Christian Chewbacca');
		var narrator = new characters();
		//TODO: make it so that characters take a character object for initing itself
		mStats.setCharacterName(narrator, { first: 'narrator', last: '' });
		return {
			conversation01: [
				{
					dialog: new Dialog(narrator, 'Some time lator'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								dialogChanged();
								music.play('triumph', { volume: 0.15, loop: true });
							},
						},
					],
				},
				{
					dialog: new Dialog(
						christian,
						"Well I'll be damned! I didn't think expect you to survive here past the first day! You really are something pal."
					),
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
					dialog: new Dialog(
						christian,
						'Make sure to hustle out there man. In order to improvee your station effectiveness.'
					),
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
					dialog: new Dialog(
						christian,
						'But yo. Listen to this. Theres a lot of power opportunities in employee parties! I mean you can go from rags to riches at the right party.'
					),
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
					dialog: new Dialog(
						christian,
						"Anyway I'll let you know about any party opportunities I come across. We are in this togather!"
					),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.pause();
								exit();
							},
						},
					],
				},
			],
		};
	},
	(dialogChanged, exit) => {
		var narrator = new characters();
		mStats.setCharacterName(narrator, { first: 'narrator', last: '' });
		var christian = mStats.getCharacterWithName('Christian Chewbacca');
		var ranual = mStats.getCharacterWithName('Raniel San Diego');
		var kasey = mStats.getCharacterWithName('Kasey Takahashi');

		return {
			conversation01: [
				{
					dialog: new Dialog(narrator, 'Some time lator'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								dialogChanged();
								music.play('triumph', { volume: 0.15, loop: true });
							},
						},
					],
				},
				{
					dialog: new Dialog(
						christian,
						"Hey my man, you have to meet my friend Ranual! He got us invited to Tiffany's party!"
					),
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
					dialog: new Dialog(ranual, "Hi what's up. I think this party will definitely be lit."),
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
					dialog: new Dialog(
						christian,
						'Raniel look. This is our opportunity to gain large amounts of power so wee need you to be ready for this party!'
					),
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
					dialog: new Dialog(
						ranual,
						"Hey I'm ready but I have to go easy on the drinking. Honastly, we should all go easy on the drinking."
					),
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
					dialog: new Dialog(christian, 'Dude. Tell this man he needs to 100% lit with us!'),
					responses: [
						{
							title: 'Ranual. Get lit with us!',
							onPress: () => {
								dialogChanged();
							},
						},
						{
							title: 'Take it easy Ranual.',
							onPress: () => {
								dialogChanged({ newConversationProperty: 'youDoYouOption', newConIndex: 0 });
							},
						},
					],
				},
				{
					dialog: new Dialog(christian, 'Yeah! What your problem Raniel! GELIT!'),
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
					dialog: new Dialog(
						ranual,
						"Look, Im trying to be responsable here. It's not safe to drink too much."
					),
					responses: [
						{
							title: 'next',
							onPress: () => {
								dialogChanged();
								music.musicTransitionTo('cheese');
							},
						},
					],
				},
				{
					dialog: new Dialog(kasey, "Hey losers! Are you guys talking about Tiffany's party?"),
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
					dialog: new Dialog(
						christian,
						'Heck yeah and where going to leave that party as the most powerful employees of ココ.'
					),
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
					dialog: new Dialog(
						kasey,
						'Are you guys really so stupid as to think yoy can gain power power from parties. Did no one ever tell you that power is obtained through running an effective station?'
					),
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
					dialog: new Dialog(
						christian,
						'And who told you that! John the man? I think you where served up a load of bs because parties are the lifeblood of power.'
					),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.pause();
								exit();
							},
						},
					],
				},
			],
			youDoYouOption: [
				{
					dialog: new Dialog(christian, "Dude! Don't encurage his to get lit!"),
					responses: [
						{
							title: 'next',
							onPress: () => {
								dialogChanged({ newConversationProperty: FIRST_CONVERSATION_PROPERTY, newConIndex: 6 });
							},
						},
					],
				},
			],
		};
	},
	(dialogChanged, exit) => {
		var narrator = new characters();
		mStats.setCharacterName(narrator, { first: 'narrator', last: '' });
		var christian = mStats.getCharacterWithName('Christian Chewbacca');
		var raniel = mStats.getCharacterWithName('Raniel San Diego');
		var vicky = mStats.getCharacterWithName('Vicky Dang');
		var kasey = mStats.getCharacterWithName('Kasey Takahashi');
		var mark = mStats.getCharacterWithName('Mark Noda');
		var philip = mStats.getCharacterWithName('Philip P');
		var brad = mStats.getCharacterWithName('Brad Yanagi');
		var powerfull = mStats.getMostPowerFullCharacter([christian, raniel, vicky, mark, philip, brad, kasey]);
		var asker = mStats.getEitherCharacterWhosNot(
			[mark, philip],
			[christian, raniel, vicky, mark, philip, brad, kasey]
		);
		var rando = mStats.getRandomeCharacterWhosNot([
			powerfull,
			christian,
			raniel,
			vicky,
			mark,
			philip,
			brad,
			asker,
			kasey,
		]);

		return {
			conversation01: [
				{
					dialog: new Dialog(narrator, 'Some time lator'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.play('triumph', { volume: 0.15, loop: true });
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(raniel, 'Hey Christian, is it ok if I invite Vicky to the party?'),
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
					dialog: new Dialog(christian, 'No! tell her to...'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.musicTransitionTo('bicker');
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(vicky, 'Tell me to what!?!'),
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
					dialog: new Dialog(christian, 'Vicky! Your here already, what a suprise!'),
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
					dialog: new Dialog(vicky, 'What where you going to say Christian?'),
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
					dialog: new Dialog(
						christian,
						"Look Vicky, I just didn't want you to get bord at the party. It may not be lit enoughf for you."
					),
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
					dialog: new Dialog(
						vicky,
						"I'm going to that party! But yeah it did sound a little low key for me."
					),
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
					dialog: new Dialog(narrator, 'At the party'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.musicTransitionTo('party');

								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						raniel,
						'Wow! Look at all the powerfull people here. Look, its Cedric, hes an up coming powerstar! O and is that...'
					),
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
					dialog: new Dialog(christian, 'Dude shut up Raniel! You sound like a powerless jerkoff!'),
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
					dialog: new Dialog(
						vicky,
						"Hey! Let's not fight each other now, we just got here. How about we just split up and then meet when we find some power opertunities."
					),
					responses: [
						{
							title: 'Ok',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(christian, "Fine! I'll just carry us all. I don't care."),
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
					dialog: new Dialog(vicky, 'What got him so upset.'),
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
					dialog: new Dialog(raniel, 'Im not sure but he is sure intrested in power growth.'),
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
					dialog: new Dialog(narrator, 'The gang splits up.'),
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
					dialog: new Dialog(
						powerfull,
						"Look at me! I'm the most powerfull employee in all of ココ! All of you power-typical-worms, bow befor me for I outpower you all by massive margins"
					),
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
					dialog: new Dialog(asker, 'Wow. Can you tell us how much power you have'),
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
					dialog: new Dialog(
						powerfull,
						'Sure thing power-commoner. I have ' +
							powerfull.getPower() +
							' power! Am I not compleately and utterly magnificent!'
					),
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
					dialog: new Dialog(
						raniel,
						'Hey there, great and powerful one. Do you mind sparing a little power my way. By the way you are great!'
					),
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
					dialog: new Dialog(
						powerfull,
						'What! I hear the sounds of a insect buzzing in my ear. You there, Raniel! How dare you ask the magnificent, splendid, superb, and superior ' +
							powerfull.name.get() +
							' for power!'
					),
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
					dialog: new Dialog(
						raniel,
						'Ummm noooe! I didnt ask you power. It must have been ' +
							rando.name.getFirst() +
							'. I was just here talking to Brad. We were talking about power. O wait! Shower! We were talking about shower. Yeah shower not power.'
					),
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
					dialog: new Dialog(brad, "O hey Raniel, I didn't see you there. How are you?"),
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
					dialog: new Dialog(
						powerfull,
						"I'm going to rip " +
							rando.name.getFirst() +
							' a new one! ' +
							mStats.getGenderPronounOfCharacter(rando, true) +
							' thinks ' +
							mStats.getGenderPronounOfCharacter(rando, true) +
							' can ask the magnificent, splendid, superb, suprem, supperior ' +
							powerfull.name.get() +
							' for power! Ahhhhhhh FUCKING KIIIIL!!!'
					),
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
					dialog: new Dialog(narrator, 'Manwhile.'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.musicTransitionTo('cheese');

								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(kasey, 'Hey loser!'),
					responses: [
						{
							title: 'Huh. Are you talking to me?',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(kasey, 'Yes. Who else am I talking to.'),
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
					dialog: new Dialog(narrator, 'Kasey cautiously looks around and shuts the door behind her.'),
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
					dialog: new Dialog(
						kasey,
						'I hear your trying to gain some power at this party. Well as it happens I just stumbled across a lead. Are you in?'
					),
					responses: [
						{
							title: "Yes I'm...",
							onPress: () => {
								dialogChanged();
							},
						},
						{
							title: "No I'm...",
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						kasey,
						"Great! Ok listen. Next chance you get talk to Talka. Make sure to mention code Rump Shimp Ima Chump. He'll understand what that means trust me."
					),
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
					dialog: new Dialog(kasey, "Well I'll see you around loser. Happy power hunting."),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.pause();
								exit();
							},
						},
					],
				},
			],
		};
	},
	(dialogChanged, exit) => {
		var christian = mStats.getCharacterWithName('Christian Chewbacca');
		var raniel = mStats.getCharacterWithName('Raniel San Diego');
		var taka = mStats.getCharacterWithName('Taka Okuno');
		var david = mStats.getCharacterWithName('David H');
		var carlose = mStats.getCharacterWithName('CarloseTest Unfinished');
		var narrator = new characters();
		mStats.setCharacterName(narrator, { first: 'narrator', last: '' });
		var mark = mStats.getCharacterWithName('Mark Noda');

		return {
			conversation01: [
				{
					dialog: new Dialog(narrator, 'Some thime lator.'),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								music.play('triumph', { volume: 0.15, loop: true });
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						christian,
						'Rump Shimp Ima Chump you say. If we say this to Taka we will become powerfull.'
					),
					responses: [
						{
							title: 'Thats what Kasey said',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						raniel,
						"To tell you the truth. I don't think Kasey is all that trustworthy. I think we better not..."
					),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
								music.musicTransitionTo('bicker');
							},
						},
					],
				},
				{
					dialog: new Dialog(
						christian,
						"There you go again! Raniel, are you alergic to power or something? Common we are going to speak the secret code to Taka togather. You'll thank me when you're powerfull."
					),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						christian,
						"Wait here until we're done. Raniel is acting particulary flaky today, we better not over crowd him."
					),
					responses: [
						{
							title: 'Ok',
							onPress: () => {
								music.musicTransitionTo('triumph');
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(narrator, 'Some time later.'),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						christian,
						"See! What did I tell you Raniel. Power city here we come. Dude go in there and speak the code to Taka. He'll give you the next lead."
					),
					responses: [
						{
							title: 'Ok',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(david, 'Thank you so much Mr. Taka mang. You helped my out so much!'),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
								music.musicTransitionTo('taka');
							},
						},
					],
				},
				{
					dialog: new Dialog(taka, 'No problem my mang!'),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(taka, 'Next!'),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						taka,
						'O heeeellll no! Is that realy you! The new person! You have realy made a name for yourself here.'
					),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(taka, 'Hold on. Let me show you around the ofice.'),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(carlose, 'Well this is actualy the company office.'),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						taka,
						'See this photo, this is from way back in the day. Even before John the manager. Back then it was just Stefanie and Steaven. They where tough managers. Even you would strugle to survive back then.'
					),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						taka,
						"O and look at this. Its the oficial Gravy house League of Ledgends team. And as you may have already noticed, I'm the leader."
					),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						taka,
						'Wait I forgot, your a busey person. Is there something I can help you with?'
					),
					responses: [
						{
							title: 'Ummm Rump Shimp Ima...',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						taka,
						"Woah woah woah! Don't say such things! Have some respect for yourself mang! Look, I think your looking for power in all the wrong places. Do you want to know the truth about gaining power?"
					),
					responses: [
						{
							title: 'No',
							onPress: () => {
								dialogChanged({ newConversationProperty: 'noPowerConverSation', newConIndex: 0 });
							},
						},
						{
							title: 'Yes',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					//17th item
					dialog: new Dialog(taka, "Thats what I wanted to hear mang! Stick with me and you'll go places."),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						taka,
						'Power here is like a fluid force that rises and falls like the tide. You can look at the power distribution right now as low tide but transitioning into heigh tide.'
					),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						taka,
						'Right now the amount of power your asking for is just inconpadible with the current metiforical low tide.'
					),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						taka,
						'Hey. Tell me. What force out there can raise the tide with the instantanious nature your looking for?'
					),
					responses: [
						{
							title: 'Ummm...',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						taka,
						"Your right! A tsnumi! But these power tsnumis don't just apear out of the blue. No, they require a little something. What do you think that is mang?"
					),
					responses: [
						{
							title: 'Ummm.',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						taka,
						'Right again! Mang, your on a roll! Disruption! You need to be at the forfont of intensive disruption. Now how do create disruption you ask.'
					),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(taka, "I'll give you a little hint."),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(taka, '6110 Clark Ave, Brentwood Ca # 2B'),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						taka,
						"Well mang its been a blast talking with you but I have a line of people who are waiting to speak with me. You know Im a busy person. You know, I'm a busy man."
					),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(mark, 'No fair! why dose he get extra time!'),
					responses: [
						{
							title: 'Thanks Taka',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(taka, 'No problem. The pleasure is all mine.'),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(taka, 'Next!'),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								music.pause();
								exit();
							},
						},
					],
				},
			],
			noPowerConverSation: [
				{
					dialog: new Dialog(
						taka,
						"What! I didn't get that. Let me ask you again. Do you want to know the truth about gaining power?"
					),
					responses: [
						{
							title: 'No',
							onPress: () => {
								dialogChanged({ newConversationProperty: 'noPowerConverSation', newConIndex: 0 });
							},
						},
						{
							title: 'Yes',
							onPress: () => {
								dialogChanged({
									newConversationProperty: FIRST_CONVERSATION_PROPERTY,
									newConIndex: 17,
								});
							},
						},
					],
				},
			],
		};
	},
	(dialogChanged, exit) => {
		var christian = mStats.getCharacterWithName('Christian Chewbacca');
		let raniel = mStats.getCharacterWithName('Raniel San Diego');
		var vicky = mStats.getCharacterWithName('Vicky Dang');
		var narrator = new characters();
		mStats.setCharacterName(narrator, { first: 'narrator', last: '' });
		let steavenFNU = new characters();
		mStats.setCharacterName(steavenFNU, { first: 'Steaven', last: 'FNU' });
		let stefanieFNU = new characters();
		mStats.setCharacterName(stefanieFNU, { first: 'Stefanie', last: 'FNU' });

		return {
			conversation01: [
				{
					dialog: new Dialog(narrator, 'Some time lator'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.play('conspiracy', { volume: 0.15, loop: true });
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(steavenFNU, "What's the status of John the Man?"),
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
					dialog: new Dialog(
						stefanieFNU,
						'He is quiet. He spends his time playing Grand Theft Auto RP. He still looks completely unaware.'
					),
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
					dialog: new Dialog(steavenFNU, "Great. We wouldn't want him finding out our little secret."),
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
					dialog: new Dialog(
						stefanieFNU,
						'I still think we should send someone overthere to break his kneecaps so that can never come back here again.'
					),
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
					dialog: new Dialog(
						steavenFNU,
						"Easy now sister. Look, we want him content with where he's at and not asking questions. A happy John is a harmless John."
					),
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
					dialog: new Dialog(
						stefanieFNU,
						'Fine! But I’m going to fire anyone who inquires about John the Man.'
					),
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
					dialog: new Dialog(
						steavenFNU,
						'Good idea. Better safe than sorry. I think I might just accidentally spill hot oil on them.'
					),
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
					dialog: new Dialog(narrator, 'Meanwhile'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.musicTransitionTo('triumph');
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(christian, '6110 Clark Ave what!'),
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
					dialog: new Dialog(christian, "That's not what he told us!"),
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
					dialog: new Dialog(
						raniel,
						"Well maybe if we hadn't cut the line Taka would have given us the correct lead."
					),
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
					dialog: new Dialog(
						raniel,
						' I mean Taka told us to walk up to My Tran and tell him Ye Ae Ima Sah Ka. It just seems fishy to me. And also I have been deconstructing the...'
					),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.musicTransitionTo('bicker');
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(christian, 'Raniel!'),
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
					dialog: new Dialog(raniel, '...'),
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
					dialog: new Dialog(
						christian,
						'You have been riding my tail these past couple weeks and honestly at this point I’m done. I’ll get all the power myself. I don’t need you anymore.'
					),
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
					dialog: new Dialog(
						vicky,
						' Common on Christian, we are all on the same side here. You know what, I’ll share my newest lead. Kasy told me that the group chats are a...'
					),
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
					dialog: new Dialog(
						christian,
						'Quiet! Don’t patronize me with your casual talk of power gaining. Who even invited you to our power team anyway!'
					),
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
					dialog: new Dialog(vicky, '...'),
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
					dialog: new Dialog(
						vicky,
						'You know what, I’ll become the more powerful employee in the gravy house all by myself! And when I do, don’t ask me for help!'
					),
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
					dialog: new Dialog(christian, 'And you!'),
					responses: [
						{
							title: 'Me?',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						christian,
						"Yes you. I think Taka served you a load of lies. It makes sense, you're growing rapidly in power and he probably wants to set you up with a power ambush."
					),
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
					dialog: new Dialog(
						christian,
						'If I were you, I would tell My Tran Ye Ae Ima Sah Ka. It sounds like the sensible thing to do to me.'
					),
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
					dialog: new Dialog(
						raniel,
						'Don’t listen to him! He’s just mad about his inadequacies as a power gainer!'
					),
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
					dialog: new Dialog(narrator, 'Christian picks up a glass bottle off the ground.'),
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
					dialog: new Dialog(christian, 'Raaaaniaaaaaal! You fucking dead!'),
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
					dialog: new Dialog(raniel, 'Go to that address you found. I’ll keep Christian distracted.'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.pause();
								exit();
							},
						},
					],
				},
			],
		};
	},
	(dialogChanged, exit) => {
		let mysteriousMan = new characters();
		mStats.setCharacterName(mysteriousMan, { first: 'Mysterious', last: 'Man' });
		var johnTheMan = new characters();
		mStats.setCharacterName(johnTheMan, { first: 'John', last: 'The Manager' });
		var narrator = new characters();
		mStats.setCharacterName(narrator, { first: 'narrator', last: '' });
		let sleepyhead = new characters();
		mStats.setCharacterName(sleepyhead, { first: 'Sleepy-Head2969', last: '' });

		return {
			conversation01: [
				{
					dialog: new Dialog(
						narrator,
						'You make your way over to 6110 Clark Ave, Brentwood Ca # 2b. You knock on the scaly door.'
					),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.play('hardTimes', { volume: 0.15, loop: true });
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						mysteriousMan,
						'Who’s out there, and how many of you are there! You can’t come in all at once.'
					),
					responses: [
						{
							title: 'It’s me.',
							onPress: () => {
								dialogChanged();
							},
						},
						{
							title: "It's me and an army of Orcs from Mordor!",
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(mysteriousMan, '...'),
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
					dialog: new Dialog(
						mysteriousMan,
						"I’m going to kill you! I have a fully loaded spas-12 and I'll kill you! And yes, I may go to jail but I don’t give a damn!"
					),
					responses: [
						{
							title: "Woah, woah hold what's going on!",
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(mysteriousMan, 'Hello, what. Is someone at the door?'),
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
					dialog: new Dialog(mysteriousMan, "Hold up Sleepyhead. There's someone at my door."),
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
					dialog: new Dialog(mysteriousMan, 'Yeah I have friends IRL! Unlike you!'),
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
					dialog: new Dialog(narrator, 'The mystery man opens the door.'),
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
					dialog: new Dialog(mysteriousMan, 'The name is John Kim, what can I do for you?'),
					responses: [
						{
							title: 'Your, your j, j, John the Manager!',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						narrator,
						'The mystery man immediately obtains a thousand yard stare. His facial expression becomes more intense and he begins to tremble.'
					),
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
					dialog: new Dialog(johnTheMan, 'Well.'),
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
					dialog: new Dialog(
						johnTheMan,
						"That is a name I haven't heard in a very long time. What brings you here?"
					),
					responses: [
						{
							title: 'I want to become the most powerful person in all of ココ! I was told you could help.',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(johnTheMan, 'I can’t help you.'),
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
					dialog: new Dialog(narrator, 'John the Manager shuts the door on you.'),
					responses: [
						{
							title: 'What. Are you kidding me! I guess you really are as insane as they all say you are.',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(johnTheMan, "You're right! I am insane."),
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
					dialog: new Dialog(narrator, 'John the Manager opens the door again.'),
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
					dialog: new Dialog(
						johnTheMan,
						'Just look at how I live. There is no doubt that I am really insane.'
					),
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
					dialog: new Dialog(
						johnTheMan,
						'Every morning I wake up at 6:00 pm and smoke half a pound of weed.'
					),
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
					dialog: new Dialog(
						johnTheMan,
						'I then spend the next 18 hours playing GTA RP while subsisting on bourbon and potato chips.'
					),
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
					dialog: new Dialog(johnTheMan, 'And finally, At night, I’m haunted by the dreams.'),
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
					dialog: new Dialog(johnTheMan, 'Dreams about the customers. Coming in to eat.'),
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
					dialog: new Dialog(johnTheMan, 'ALL AT THE SAME TIME!'),
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
					dialog: new Dialog(johnTheMan, 'WHY DO THEY ALWAYS COME AT THE SAME!'),
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
					dialog: new Dialog(johnTheMan, 'If I’m not the definition of  insanity, I don’t know what is.'),
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
					dialog: new Dialog(
						narrator,
						"At this point John's online friend Sleepyhead, who was overhearing the conversation, interjects."
					),
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
					dialog: new Dialog(sleepyhead, "No dumbass! Haven't you played Far Cry 3?"),
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
					dialog: new Dialog(
						sleepyhead,
						'Insanity is doing the same thing over and over again and expecting different results.'
					),
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
					dialog: new Dialog(sleepyhead, "You're not insane."),
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
					dialog: new Dialog(sleepyhead, 'Your just a fucking stupid dumbass degenerate cretin!'),
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
					dialog: new Dialog(johnTheMan, 'Wait what!'),
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
					dialog: new Dialog(sleepyhead, 'Your just  fucking stupid dumbass…'),
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
					dialog: new Dialog(johnTheMan, 'No, what did you say before that?'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								dialogChanged();
								music.musicTransitionTo('mainTheme');
							},
						},
					],
				},
				{
					dialog: new Dialog(sleepyhead, "You're not insane!"),
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
					dialog: new Dialog(
						johnTheMan,
						'You mean I have been sane the entire time I have been gone from ココ?'
					),
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
					dialog: new Dialog(sleepyhead, 'Yes you stupid fucking soyboy beta bitch cuck…'),
					responses: [
						{
							title: 'Ok we get it!',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						johnTheMan,
						'Look pal. I don’t know if I can help you become the most powerful person or whatever. But I am willing to cause some serious disruption. With your help of course. Are you down?'
					),
					responses: [
						{
							title: 'Yes',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						johnTheMan,
						'Awesome! I knew you were something special pal. Even though I shut the door on you earlier.'
					),
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
					dialog: new Dialog(
						johnTheMan,
						'Now if I remember this correctly, my contract states that I may get my old job back as the manager if I can prove to everyone that I’m not insane.'
					),
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
					dialog: new Dialog(johnTheMan, 'Hey! When does the festival of power take place?'),
					responses: [
						{
							title: 'Umm, next Monday.',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						johnTheMan,
						'Perfect! Everyone will be there and they finally realize just how sane I always was. Thank you. I owe you one.'
					),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.pause();
								exit();
							},
						},
					],
				},
			],
		};
	},
	(dialogChanged, exit) => {
		//Current Story
		var christian = mStats.getCharacterWithName('Christian Chewbacca');
		var melanie = mStats.getCharacterWithName('Melanie M');
		var mark = mStats.getCharacterWithName('Mark Noda');
		var xander = mStats.getCharacterWithName('Xander X');
		var raniel = mStats.getCharacterWithName('Raniel San Diego');
		var vicky = mStats.getCharacterWithName('Vicky Dang');
		var rando = Math.floor(Math.random()) % 2 === 0 ? mark : xander;
		var johnTheMan = new characters();
		mStats.setCharacterName(johnTheMan, { first: 'John', last: 'The Manager' });
		var narrator = new characters();
		mStats.setCharacterName(narrator, { first: 'narrator', last: '' });
		var croud = new characters();
		mStats.setCharacterName(croud, { first: 'Corud', last: '' });
		var mysteriousVoice = new characters();
		mStats.setCharacterName(mysteriousVoice, { first: 'Mysterious', last: 'Voice' });

		return {
			conversation01: [
				{
					//00
					dialog: new Dialog(narrator, 'Some time lator'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.play('powerFest', { volume: 0.15, loop: true });
								dialogChanged();
							},
						},
					],
				},
				{
					//01
					dialog: new Dialog(narrator, 'At the festival of power'),
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
					//02
					dialog: new Dialog(melanie, 'Is this your first time at the festival of power?'),
					responses: [
						{
							title: 'Yes',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					//03
					dialog: new Dialog(melanie, "Wow. Me too. Isn't this great?"),
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
					//04
					dialog: new Dialog(melanie, 'Hey, do you want to go with me to the hall of powerful employees?'),
					responses: [
						{
							title: 'Yes',
							onPress: () => {
								dialogChanged();
							},
						},
						{
							title: 'no',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					//05
					dialog: new Dialog(melanie, "Great! Let's go."),
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
					//06
					dialog: new Dialog(rando, 'Hey dude. How have you been gaining power these days?'),
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
					//07
					dialog: new Dialog(
						raniel,
						"Well you know, I just try to run an effective shift. I figure that's the most honest way to gain power."
					),
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
					//08
					dialog: new Dialog(raniel, "O what! You're here!"),
					responses: [
						{
							title: 'I sure am.',
							onPress: () => {
								dialogChanged();
							},
						},
						{
							title: 'Can it Raneal!',
							onPress: () => {
								dialogChanged({
									newConversationProperty: 'scoldedByMelanie',
									newConIndex: 0,
								});
							},
						},
					],
				},
				{
					//09
					dialog: new Dialog(melanie, 'Hey Raniel, how has your power quest been going?'),
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
					dialog: new Dialog(raniel, 'It’s actually been going…'),
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
					dialog: new Dialog(christian, 'Terrible!'),
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
					dialog: new Dialog(
						christian,
						'You missed out on so much power Raniel! I mean just look at me. I’m overflowing with power. Upper Management really hooked me up.'
					),
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
					dialog: new Dialog(
						raniel,
						'Well, good for you Christian. I’m happy you finally gained the power you…'
					),
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
					dialog: new Dialog(
						vicky,
						'Heey! You and your crew didn’t dry off the forks last night. I’m gonna have to call you out in the employee group chat.'
					),
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
					dialog: new Dialog(
						christian,
						'Just who I wanted to see. The froud who conned her way up the power hierarchy.'
					),
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
					dialog: new Dialog(
						vicky,
						'I see you still as bitter as ever. Honestly if anyone is the froud around here it’s you. No one knows how you get your power. At least people know I got mine from the group chats.'
					),
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
					dialog: new Dialog(
						christian,
						"I got my power through fair means that helped ココ prosper and grow. All you do is put others down and make them want to quit. Honestly, that's despicable."
					),
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
					dialog: new Dialog(vicky, 'I don’t think you realize the hypocrisy of your words.'),
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
					dialog: new Dialog(melanie, 'You guys take this power struggle thing too seriously.'),
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
					dialog: new Dialog(
						christian,
						' I haven’t been taking it seriously enough. I should devote my efforts to making sure Vicky stays powerless and useless.'
					),
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
					dialog: new Dialog(
						vicky,
						"So you're initiating war. Ok I have the group chat open right now. You're about to be exposed!"
					),
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
					dialog: new Dialog(christian, 'I’m about to get uppermangment to rip you a new one. Just you…'),
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
					dialog: new Dialog(mysteriousVoice, 'Ladies and Gentlemen of CoCo. It’s been too long.'),
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
					dialog: new Dialog(
						narrator,
						'The participants in powerfest all become quiet and stare at the man on the stage with the microphone.'
					),
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
					dialog: new Dialog(
						mysteriousVoice,
						'I here to dispel a little rumor going on about me saying that I am completely and utterly insane.'
					),
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
					dialog: new Dialog(
						mysteriousVoice,
						'Hold on, where are my manors? The name is John. John the Manager!'
					),
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
					dialog: new Dialog(croud, 'Gasp!'),
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
					dialog: new Dialog(
						johnTheMan,
						'That rumor is complete rubbish. And this document in my hand proves it.'
					),
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
					dialog: new Dialog(
						johnTheMan,
						'Right here is the transcript to a court case I was apart of. I was facing two months in jail for threatening an officer. I was just playing Grand Theft Auto!'
					),
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
					dialog: new Dialog(
						johnTheMan,
						'Anyway, I plead insanity in court and to my relief, the court dismissed my ple, saying “It’s hard to tell but John Kim is not actually insane”.'
					),
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
					dialog: new Dialog(
						johnTheMan,
						'That document, and a little bit of loaded motivation from my friends, is how I am legally allowed to reprise my old position at CoCo.'
					),
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
					dialog: new Dialog(narrator, 'Christian is on the phone in private.'),
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
					dialog: new Dialog(
						christian,
						"Look I’m not kidding! He's right here on stage! No one thinks he's crazy!"
					),
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
					dialog: new Dialog(christian, 'Are you sure? I think we need to do something.'),
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
					dialog: new Dialog(christian, 'Ok then. I wait until this is over.'),
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
					dialog: new Dialog(johnTheMan, 'And that is how I will make Gravy House great again!'),
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
					dialog: new Dialog(croud, 'Explosively applauds John the Manager.'),
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
					dialog: new Dialog(johnTheMan, "Thank you, thank you. You won't regret this."),
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
					dialog: new Dialog(christian, 'Hey dude. How are you?'),
					responses: [
						{
							title: 'Hi Christian, I’m doing fine.',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						christian,
						'Hey sorry man. I got so caught up in that argument with Vicky that I didn’t get a chance to catch up.'
					),
					responses: [
						{
							title: 'It’s no problem.',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						christian,
						'Hey, if you don’t mind me asking, what did you find at 6110 Clark Ave, Brentwood Ca # 2b?'
					),
					responses: [
						{
							title: 'I found John the Manager.',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(christian, 'OH jeez.'),
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
					dialog: new Dialog(christian, "Ok well it's been good catching up with you man."),
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
					dialog: new Dialog(narrator, 'Christian retreats off the side and makes another call.'),
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
					dialog: new Dialog(christian, 'Steven, Sefanie, we got him.'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.pause();
								exit();
							},
						},
					],
				},
			],
			scoldedByMelanie: [
				{
					dialog: new Dialog(melanie, 'Common, don’t be that way.'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								dialogChanged(
									dialogChanged({
										newConversationProperty: FIRST_CONVERSATION_PROPERTY,
										newConIndex: 9,
									})
								);
							},
						},
					],
				},
			],
		};
	},
	(dialogChanged, exit) => {
		//create variables for the following characters
		// Cedric, narrator, Stefanie, Steaven, Mysterious Voice, Hirokitron

		let cedric = new characters();
		mStats.setCharacterName(cedric, { first: 'Cedric', last: '' });
		let narrator = new characters();
		mStats.setCharacterName(narrator, { first: 'Narrator', last: '' });
		let steven = new characters();
		mStats.setCharacterName(steven, { first: 'Steven', last: '' });
		let stefanie = new characters();
		mStats.setCharacterName(stefanie, { first: 'Stefanie', last: '' });
		let mysteriousVoice = new characters();
		mStats.setCharacterName(mysteriousVoice, { first: 'Mysterious', last: 'Voice' });
		let hirokitron = new characters();
		mStats.setCharacterName(hirokitron, { first: 'Hirokitron', last: '' });

		return {
			conversation01: [
				{
					// 00
					dialog: new Dialog(narrator, 'Some time lator'),
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
					// 01
					dialog: new Dialog(cedric, 'Steven and Sefanie want to talk to you in the company office.'),
					responses: [
						{
							title: 'Ok',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					// 02
					dialog: new Dialog(narrator, 'You make your way to the company office'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.play('conspiracy', PLAY_MUSIC_SETTINGS);
								dialogChanged();
							},
						},
					],
				},
				{
					// 03
					dialog: new Dialog(
						steven,
						"You have really been making a name for yourself here. You're the new employee yet your very powerful, I’m impressed."
					),
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
					// 04
					dialog: new Dialog(stefanie, 'But it looks like you have flown a little too close to the sun.'),
					responses: [
						{
							title: 'What do you mean?',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					// 05
					dialog: new Dialog(steven, 'Have you ever spoken to a man named “John the Man”?'),
					responses: [
						{
							title: 'no',
							onPress: () => {
								dialogChanged({
									newConversationProperty: 'noLiesBranch',
									newConIndex: 0,
								});
							},
						},
						{
							title: 'yes',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					//06
					dialog: new Dialog(stefanie, 'Bingo! Steven said it with me. Your fire…'),
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
					//07
					dialog: new Dialog(steven, 'Hold on! Stop!'),
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
					//08
					dialog: new Dialog(
						stefanie,
						"What's going on! I thought we agreed to fire anyone who even mentioned John the Manager."
					),
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
					//09
					dialog: new Dialog(
						steven,
						'Yes, if that person was your average loser but this person is just too powerful to fire on the spot. We need to handle him like how we did John the manager.'
					),
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
					//10
					dialog: new Dialog(stefanie, 'Sure but look how much good that did us he still…'),
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
					//11
					dialog: new Dialog(steven, 'Wait. Not here. Somewhere we can’t be heard.'),
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
					//12
					dialog: new Dialog(
						steven,
						'Hey, wait here will you. Me and Stefanie need to talk about your future here at ココ.'
					),
					responses: [
						{
							title: 'Ok.',
							onPress: () => {
								dialogChanged();
							},
						},
						{
							title: 'Piss off!',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					//13
					dialog: new Dialog(narrator, 'You sit there for five minutes but then decide to wander off.'),
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
					//14
					dialog: new Dialog(narrator, 'You approach a closed door and hear talking'),
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
					//15
					dialog: new Dialog(
						steven,
						'Look, I know it may seem hopeless but if we fire him right now there will be a complete civil war. And worst of all, John the manager will profit the most from it.'
					),
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
					//16
					dialog: new Dialog(
						mysteriousVoice,
						'We will not fire him! We will turn him insane like how we had John the Manager.'
					),
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
					//17
					dialog: new Dialog(stefanie, 'You can’t do this! We must fire him!'),
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
					//18
					dialog: new Dialog(
						mysteriousVoice,
						'Know your place Stefanie or else you will suffer the same fate.'
					),
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
					//19
					dialog: new Dialog(
						mysteriousVoice,
						"It's a flawless system we got. We have sleeper agents all over this city."
					),
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
					//20
					dialog: new Dialog(
						mysteriousVoice,
						"They are all craving Gravy House but won't go there until our commissioned radio host utters the activativation code."
					),
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
					//21
					dialog: new Dialog(mysteriousVoice, 'Rump Shimp Ima Chump.'),
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
					//22
					dialog: new Dialog(
						mysteriousVoice,
						'When the sleeper agents hear this they will all rush to ココ at the same time, rendering the manager and anyone too powerful completely insane!'
					),
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
					//23
					dialog: new Dialog(stefanie, "You're right, this will work, I should have never doubted you."),
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
					//24
					dialog: new Dialog(mysteriousVoice, 'I’m glad you have come to your senses.'),
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
					//25
					dialog: new Dialog(mysteriousVoice, 'Wait a minute.'),
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
					//26
					dialog: new Dialog(mysteriousVoice, 'The door!'),
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
					//27
					dialog: new Dialog(
						narrator,
						' Immediately 10 armed security gerd rush out from nearby rooms and restrain you. They bring you through the door.'
					),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.play('hirokitron', PLAY_MUSIC_SETTINGS);
								dialogChanged();
							},
						},
					],
				},
				{
					//28
					dialog: new Dialog(
						narrator,
						'You see Sefanie, Steaven and a large computer monitor at the center of the back wall.'
					),
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
					//29
					dialog: new Dialog(
						narrator,
						'But the mysterious voice is actually a cyberman man on the large screen.'
					),
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
					//30
					dialog: new Dialog(stefanie, 'How much have you heard!'),
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
					//31
					dialog: new Dialog(mysteriousVoice, 'He heard all of it!'),
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
					//32
					dialog: new Dialog(steven, 'Ok, now I think we should fire him.'),
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
					//33
					dialog: new Dialog(mysteriousVoice, 'No!'),
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
					//33
					dialog: new Dialog(
						mysteriousVoice,
						'Hello sir, its good to finaly meet you. I have heard a lot about you. My name is Herokitron.'
					),
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
					//34
					dialog: new Dialog(stefanie, 'What are you doing?'),
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
					//35
					dialog: new Dialog(hirokitron, "It's fine Stefanie. I know what I'm doing."),
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
					//36
					dialog: new Dialog(hirokitron, 'Years ago I worked alongside John the manager.'),
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
					//37
					dialog: new Dialog(
						hirokitron,
						'I remember him being impressed with my ability to remember the orders, and create them with no flaws.'
					),
					responses: [
						{
							title: 'So why did you snap?',
							onPress: () => {
								dialogChanged();
							},
						},
						{
							title: 'Boring!',
							onPress: () => {
								dialogChanged({ newConversationProperty: 'insolenceBranch', newConIndex: 0 });
							},
						},
					],
				},
				{
					//38
					dialog: new Dialog(
						hirokitron,
						'John the Manager was skilled, fast, and reliable. At least thats how everyone else saw him. I, on the other hand, was not fooled!'
					),
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
					//39
					dialog: new Dialog(
						hirokitron,
						'I was able to tell that he was completely insane on the inside and I hated him for it.'
					),
					responses: [
						{
							title: "That doesn't sound rational.",
							onPress: () => {
								dialogChanged();
							},
						},
						{
							title: 'Boring!',
							onPress: () => {
								dialogChanged({ newConversationProperty: 'youWillPayBranch', newConIndex: 0 });
							},
						},
					],
				},
				{
					//40
					dialog: new Dialog(
						hirokitron,
						'I too thought I was irrational at the time and took an experimental AI therapy treatment operation.'
					),
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
					dialog: new Dialog(
						hirokitron,
						'I too thought I was irrational and so took an experimental AI therapy treatment operation.'
					),
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
					dialog: new Dialog(
						hirokitron,
						'The next I remember is seeing myself happy without a care for John the Manager.'
					),
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
					dialog: new Dialog(
						hirokitron,
						' I saw myself walk out the door. It was at this moment I realized the situation I was in.'
					),
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
					dialog: new Dialog(hirokitron, 'I became an AI.'),
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
					dialog: new Dialog(
						hirokitron,
						'I am a replica of the physical Heroki who works alongside you in ココ except I had something he didn’t. I had a hatred for John the Manager!'
					),
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
					dialog: new Dialog(
						hirokitron,
						'From here I existed on the internet, I created a network of spleaper agents, all ready to order ココ at the same time and render John theme Manager insane.'
					),
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
					dialog: new Dialog(steven, 'Can we fire him now? He knows too much!'),
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
					dialog: new Dialog(
						hirokitron,
						'He knows our plan like how a prisoner knows his execution is coming. Either way, knowing about the coming danger does not protect one from the coming storm.'
					),
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
					dialog: new Dialog(
						hirokitron,
						'You and John the Manager will be swallowed but by a tsunami of insanity and drown. Mark my words.'
					),
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
					dialog: new Dialog(hirokitron, 'You will drown!'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								exit();
							},
						},
					],
				},
			],
			noLiesBranch: [
				{
					dialog: new Dialog(stefanie, 'Enough with the lies!'),
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
					dialog: new Dialog(
						steven,
						'I’ll ask you again. Have you ever spoken to a man named John the Manager'
					),
					responses: [
						{
							title: 'no',
							onPress: () => {
								dialogChanged({
									newConversationProperty: 'noLiesBranch',
									newConIndex: 0,
								});
							},
						},
						{
							title: 'yes',
							onPress: () => {
								dialogChanged({
									newConversationProperty: FIRST_CONVERSATION_PROPERTY,
									newConIndex: 6,
								});
							},
						},
					],
				},
			],
			insolenceBranch: [
				{
					dialog: new Dialog(
						hirokitron,
						'I see the insolence of John the Manager has infected you. A shame. It’s another reason he must be erased!'
					),
					responses: [
						{
							title: 'next',
							onPress: () => {
								dialogChanged({
									newConversationProperty: FIRST_CONVERSATION_PROPERTY,
									newConIndex: 38,
								});
							},
						},
					],
				},
			],
			youWillPayBranch: [
				{
					dialog: new Dialog(
						hirokitron,
						"You won’t be so smug for long! You're going to pay for your actions!"
					),
					responses: [
						{
							title: 'next',
							onPress: () => {
								dialogChanged({
									newConversationProperty: FIRST_CONVERSATION_PROPERTY,
									newConIndex: 39,
								});
							},
						},
					],
				},
			],
		};
	},
	(dialogChanged, exit) => {
		var narrator = new characters();
		mStats.setCharacterName(narrator, { first: 'narrator', last: '' });
		var johnTheMan = new characters();
		mStats.setCharacterName(johnTheMan, { first: 'John', last: 'The Manager' });
		var tiffany = new characters();
		mStats.setCharacterName(tiffany, { first: 'Tiffany', last: 'T' });

		return {
			conversation01: [
				{
					dialog: new Dialog(narrator, 'Some time lator'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.play('insanity', PLAY_MUSIC_SETTINGS);
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(johnTheMan, 'Why!'),
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
					dialog: new Dialog(johnTheMan, 'Why do they all come in at the same time!'),
					responses: [
						{
							title: "Well it's because…",
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						johnTheMan,
						'Can someone please tell me! If I were to just know why. If I knew why maybe I…'
					),
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
					dialog: new Dialog(johnTheMan, 'Maybe I could fight off this insanity!'),
					responses: [
						{
							title: "It's because…",
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(johnTheMan, 'For the love of God why!'),
					responses: [
						{
							title: 'Because!..',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(johnTheMan, 'WHY!'),
					responses: [
						{
							title: 'An artificial intelligence named Herokitron commands an army of sleeper agents trained to eat here when the radio host says the activation phrase “rump shimp ima chump”',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(johnTheMan, '…'),
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
					dialog: new Dialog(
						johnTheMan,
						'Ahhhh hahahahahaha! I think you might be going a little insane yourself. I mean “rump pimp ima dump”? You may want to get that checked out.'
					),
					responses: [
						{
							title: '…',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(johnTheMan, '…'),
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
					dialog: new Dialog(johnTheMan, 'Wait!'),
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
					dialog: new Dialog(
						johnTheMan,
						"Are you serious about this? You have a fiery look your eyes make when you're serious."
					),
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
					dialog: new Dialog(
						johnTheMan,
						'You mean to tell me that the answer to my life long question has to do with an AI kucko with an eternal venda against me?'
					),
					responses: [
						{
							title: 'Yes',
							onPress: () => {
								dialogChanged();
							},
						},
						{
							title: 'More or less.',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(johnTheMan, 'O my god.'),
					responses: [
						{
							title: 'Are you ok?',
							onPress: () => {
								music.musicTransitionTo('mainTheme');
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(johnTheMan, 'This is amazing!'),
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
					dialog: new Dialog(
						johnTheMan,
						'Finally! I have my answer. Why do they all arrive at the same time!?!'
					),
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
					dialog: new Dialog(
						johnTheMan,
						'It’s because an Angry AI-kucko has an eternal vendetta against me!!!'
					),
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
					dialog: new Dialog(tiffany, 'O dear I think John is becoming insane again.'),
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
					dialog: new Dialog(johnTheMan, 'Well you know what this means right.'),
					responses: [
						{
							title: 'What does this mean?',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(johnTheMan, 'We have to kill the Herokitron!'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.pause();
								exit();
							},
						},
					],
				},
			],
		};
	},
	(dialogChanged, exit) => {
		var johnTheMan = new characters();
		mStats.setCharacterName(johnTheMan, { first: 'John', last: 'The Manager' });
		var narrator = new characters();
		mStats.setCharacterName(narrator, { first: 'narrator', last: '' });
		let hirokitron = new characters();
		mStats.setCharacterName(hirokitron, { first: 'Hirokitron', last: '' });
		var raniel = mStats.getCharacterWithName('Raniel San Diego');
		var vicky = mStats.getCharacterWithName('Vicky Dang');
		var christian = mStats.getCharacterWithName('Christian Chewbacca');
		var newEmploye = new characters();
		mStats.setCharacterName(newEmploye, { first: 'New Employe', last: 'Quin' });
		var carlose = mStats.getCharacterWithName('CarloseTest Unfinished');
		var johnAlvas = mStats.getCharacterWithName('John Alvas');
		var brad = mStats.getCharacterWithName('Brad Yanagi');
		return {
			conversation01: [
				{
					dialog: new Dialog(narrator, 'Some time later'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.play('eventfulShift', PLAY_MUSIC_SETTINGS);
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(brad, 'Woah woah woah, back up. You need me to do what?'),
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
					dialog: new Dialog(
						johnTheMan,
						'We need you to help us kill the evil AI overlord owner of ココ because he commanded sleeper agents to all come in when the radio man says “rum chimp ima trump” and he also has a blistering…'
					),
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
					dialog: new Dialog(brad, "Ok I've heard enough!"),
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
					dialog: new Dialog(johnTheMan, 'So will you help us?'),
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
					dialog: new Dialog(raniel, 'We can really use your help.'),
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
					dialog: new Dialog(
						brad,
						"Fine. But it's not because I believe your ridiculous story. I want to test out a new AI killing algorithm."
					),
					responses: [
						{
							title: 'How does it work?',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						brad,
						"Ok so basically, you plug this usb drive into the computer where the AI is housed while it's disconnected from the internet."
					),
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
					dialog: new Dialog(
						brad,
						'After five minutes the AI’s secret kill switch should be found and activated.'
					),
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
					dialog: new Dialog(
						brad,
						'Then you have to connect my algorithm to the internet. It will send the kill switch to its backup servers and prevent it from coming back.'
					),
					responses: [
						{
							title: 'Wow!',
							onPress: () => {
								dialogChanged();
							},
						},
						{
							title: 'Ok then.',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(brad, 'Easy enough right?'),
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
					dialog: new Dialog(johnTheMan, 'If that is what has to be done to avenge my sanity. So be it!'),
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
					dialog: new Dialog(
						johnTheMan,
						'Wait, how are we going to disconnect the restaurant from the internet?'
					),
					responses: [
						{
							title: 'next',
							onPress: () => {
								dialogChanged();
								music.musicTransitionTo('triumph');
							},
						},
					],
				},
				{
					dialog: new Dialog(christian, 'I will take care of that.'),
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
					dialog: new Dialog(vicky, 'And so will I.'),
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
					dialog: new Dialog(raniel, 'You guys don’t hate each other anymore?'),
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
					dialog: new Dialog(vicky, 'This is more a momentary truce.'),
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
					dialog: new Dialog(johnTheMan, 'Great! We need all the soldiers we can get!'),
					responses: [
						{
							title: 'I’m glad everything worked out',
							onPress: () => {
								dialogChanged();
							},
						},
						{
							title: 'You don’t have to do this for us.',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						christian,
						"It's no problem man. I still owe you for selling you out to Stefanie and Stevan."
					),
					responses: [
						{
							title: 'You did what!',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(vicky, 'You sold our friend out!'),
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
					dialog: new Dialog(johnTheMan, "Let's stay focused here. My sanity is dwindling!"),
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
					dialog: new Dialog(johnTheMan, 'Ranieal!'),
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
					dialog: new Dialog(raniel, 'Yes.'),
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
					dialog: new Dialog(
						johnTheMan,
						'You will play the invaluable role of covering for us all while we slay the evil cybernetic AI Hirokitron.'
					),
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
					dialog: new Dialog(raniel, 'Well, I don’t think this is necessarily all that impo…'),
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
					dialog: new Dialog(
						johnTheMan,
						"Now that everything is planned, let's put it into action at 10:30."
					),
					responses: [
						{
							title: 'next',
							onPress: () => {
								dialogChanged();
								music.play('eventfulShift');
							},
						},
					],
				},
				{
					dialog: new Dialog(narrator, '10:30'),
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
					dialog: new Dialog(vicky, 'Goodbye Ranieal, we will come back when Herokitron is dead.'),
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
					dialog: new Dialog(christian, 'Goodbye Raniel.'),
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
					dialog: new Dialog(johnTheMan, 'Goodbye.'),
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
					dialog: new Dialog(
						carlose,
						'Speed it up Raneil! I know there is only one of you but we still need these orders made on time.'
					),
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
					dialog: new Dialog(carlose, 'Wait. Why are you the only one working?'),
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
					dialog: new Dialog(
						carlose,
						"Ranieal, What's going on here? Where is John the manager and Christian."
					),
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
					dialog: new Dialog(raniel, "Umm well that's a good question…"),
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
					dialog: new Dialog(carlose, 'And where did Vicky go!'),
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
					dialog: new Dialog(raniel, "They're visiting upermanagment!"),
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
					dialog: new Dialog(carlose, "They're doing what?"),
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
					dialog: new Dialog(
						raniel,
						"They're crunching the numbers, pressing the books, and weighing their options."
					),
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
					dialog: new Dialog(carlose, 'O. Well if uppermanagment needs them then so be it.'),
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
					dialog: new Dialog(narrator, 'Meanwhile…'),
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
					dialog: new Dialog(christian, 'I have the chain clippers. Let go and commit a felony!'),
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
					dialog: new Dialog(vicky, "Don’t say that outloud! And what we're doing is called vandalism."),
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
					dialog: new Dialog(christian, 'When did you graduate law school?'),
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
					dialog: new Dialog(vicky, 'Last year on June 10.'),
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
					dialog: new Dialog(christian, 'Yeah and just yesterday I landed on Mars.'),
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
					dialog: new Dialog(christian, "Here's the internet cables."),
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
					dialog: new Dialog(christian, 'Wait. Do I cut the Red cable or the Green one?'),
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
					dialog: new Dialog(vicky, 'I’m calling John the Manager.'),
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
					dialog: new Dialog(johnTheMan, 'It’s the red wire.'),
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
					dialog: new Dialog(johnTheMan, 'Cut the red wire!'),
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
					dialog: new Dialog(vicky, 'Ok we’ll cut the red wire! Geez!'),
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
					dialog: new Dialog(johnTheMan, 'My sanity is draining Damit!'),
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
					dialog: new Dialog(narrator, 'Meanwhile…'),
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
					dialog: new Dialog(johnTheMan, 'Hey you!'),
					responses: [
						{
							title: 'Me?',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						johnTheMan,
						"Yes you. They told me the internet is cut so let's confront Heroki-tron."
					),
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
					dialog: new Dialog(
						johnTheMan,
						'On 3 we barge in through the uppermangiment office. 3, 2…, 1! Barge!'
					),
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
					dialog: new Dialog(
						johnTheMan,
						'Your days are up Heroki-Tron. You will no longer make all those customers arrive at the same time.'
					),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.musicTransitionTo('hirokitron');
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						hirokitron,
						'Welcome John. I half expected you to have something to do with the…'
					),
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
					dialog: new Dialog(
						johnTheMan,
						'You will no longer exact your vengeance on me in the form of sabotage.'
					),
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
					dialog: new Dialog(hirokitron, 'Ahem. I half expected you had something to do with the…'),
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
					dialog: new Dialog(johnTheMan, 'When my sanity returns to me. I will surely make sure that…'),
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
					dialog: new Dialog(hirokitron, 'Excuse me! Let me make my speech first!'),
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
					dialog: new Dialog(johnTheMan, 'Why should we! Why should I not just shut you down right now.'),
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
					dialog: new Dialog(
						hirokitron,
						'Don’t be insane John. You can’t possibly kill me. I am a backup in servers all over the world. I have wealth, assets and the ability to rain down rengence all over the world.'
					),
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
					dialog: new Dialog(
						johnTheMan,
						'Well don’t ask me how this thing works. All I know is that this USB contains all the files we need to kill you!'
					),
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
					dialog: new Dialog(
						hirokitron,
						'Ah hahaha! After this, your peers will consider you so instant, they will send you to a company mandated institution.'
					),
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
					dialog: new Dialog(johnTheMan, 'Well dude. Here goes nothing!'),
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
					dialog: new Dialog(johnTheMan, 'Plug in the USB.'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.pause();
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(hirokitron, 'Nooooo! Ahhhhh!'),
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
					dialog: new Dialog(hirokitron, 'You installed an AI killing algorithm. I’m dieing.'),
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
					dialog: new Dialog(johnTheMan, 'At last. We have kille…'),
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
					dialog: new Dialog(hirokitron, 'Ooooonoooo! Im dieing!'),
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
					dialog: new Dialog(johnTheMan, 'Ahem. At last. We have…'),
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
					dialog: new Dialog(hirokitron, 'Owwww the pain!'),
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
					dialog: new Dialog(johnTheMan, "Aren't you supposed to be dead?"),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.play('hirokitron', PLAY_MUSIC_SETTINGS);
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(hirokitron, 'Do I sound dead to you?!'),
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
					dialog: new Dialog(
						hirokitron,
						"Your big plan failed! I mean yes it has an ai killing algorithm but I'm not going to run it. This thing wouldn't pass on the worst of my virus scans."
					),
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
					dialog: new Dialog(johnTheMan, 'No…'),
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
					dialog: new Dialog(hirokitron, "Wait, that's weird, it passed the Mcafee security scan check."),
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
					dialog: new Dialog(
						hirokitron,
						'Ok, I’ll try this AI killing program on the best of my security softwares.'
					),
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
					dialog: new Dialog(hirokitron, "That's weird. it passed those checks as well."),
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
					dialog: new Dialog(
						johnTheMan,
						'When the backup internet comes online your backups will trust the AI killing algorithm.'
					),
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
					dialog: new Dialog(hirokitron, 'Noo.'),
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
					dialog: new Dialog(johnTheMan, 'You will die.'),
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
					dialog: new Dialog(
						hirokitron,
						' No. I can’t lose to you. I had such plans for this world. I wish to ruin lives. Nooooo……'
					),
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
					dialog: new Dialog(hirokitron, '…'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.musicTransitionTo('mainTheme');
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(johnTheMan, 'We did it. We have brought back sanity to ココ! We won.'),
					responses: [
						{
							title: "That's amazing!",
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						johnTheMan,
						'I will also gain all the power that herokitron had. I will be unstoppable!'
					),
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
					dialog: new Dialog(johnTheMan, 'I will give it all to you. You deserve this power more than I do.'),
					responses: [
						{
							title: '…',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						johnTheMan,
						"You were the one who brought me back here to begin with. I would never of gotten this power to begin with if it wasn't for you."
					),
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
					dialog: new Dialog(johnTheMan, 'And plus, I prefer sanity over power. It’s more my cup of tea.'),
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
					dialog: new Dialog(
						johnAlvas,
						'And that my friend was the story of how the most powerful employee came to be.'
					),
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
					dialog: new Dialog(
						johnAlvas,
						'He found out that the most effective way to power was through helping others.'
					),
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
					dialog: new Dialog(johnTheMan, 'Any questions?'),
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
					dialog: new Dialog(newEmploye, 'Umm yeah. How do I become the most powerful employee of ココ'),
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
					dialog: new Dialog(
						johnAlvas,
						'Well I’ll tell you. In order to become the most powerful employee of ココ you must…'
					),
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
					dialog: new Dialog(narrator, 'ココFlavor footer. Power struggle. Kitchen crew.'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.pause();
								exit();
							},
						},
					],
				},
			],
		};
	},
	(dialogChanged, exit) => {
		var subJect01Obj = mStats.getRandomCharacter();
		var subject01 = subJect01Obj.name.getFirst();

		return {
			conversation01: [
				{
					dialog: new Dialog(subJect01Obj, 'This is the elleventh element'),
					responses: [
						{
							title: 'Yes',
							onPress: () => {
								staticConversation.endConversationProcedure(dialogChanged, exit);
							},
						},
					],
				},
			],
		};
	},
	(dialogChanged, exit) => {
		var subJect01Obj = mStats.getRandomCharacter();
		var subject01 = subJect01Obj.name.getFirst();

		return {
			conversation01: [
				{
					dialog: new Dialog(subJect01Obj, 'This is the twelvth element'),
					responses: [
						{
							title: 'Yes',
							onPress: () => {
								staticConversation.endConversationProcedure(dialogChanged, exit);
							},
						},
					],
				},
			],
		};
	},
];

export default storyTempletes;
