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
						'Heck yeah and where going to leave that party as the most powerful employees of Gravyhouse.'
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
						"Look at me! I'm the most powerfull employee in all of Gravyhouse! All of you power-typical-worms, bow befor me for I outpower you all by massive margins"
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
							title: 'I want to become the most powerful person in all of Gravyhouse! I was told you could help.',
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
						'You mean I have been sane the entire time I have been gone from Gravyhouse?'
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
						"I got my power through fair means that helped Gravyhous prosper and grow. All you do is put others down and make them want to quit. Honestly, that's despicable."
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
					dialog: new Dialog(
						steven,
						'Hey, wait here will you. Me and Stefanie need to talk about your future here at Gravyhouse.'
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
					dialog: new Dialog(
						mysteriousVoice,
						'When the sleeper agents hear this they will all rush to Gravyhouse at the same time, rendering the manager and anyone too powerful completely insane!'
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
					dialog: new Dialog(
						stefanie,
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
		};
	},
	(dialogChanged, exit) => {
		var subJect01Obj = mStats.getRandomCharacter();
		var subject01 = subJect01Obj.name.getFirst();

		return {
			conversation01: [
				{
					dialog: new Dialog(subJect01Obj, 'This is the ninth element'),
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
					dialog: new Dialog(subJect01Obj, 'This is the tennth element'),
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
