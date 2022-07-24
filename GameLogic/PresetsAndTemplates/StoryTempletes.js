import characters from '../ManageStats/Characters';
import mStats from '../ManageStats/ManageStats';
import Dialog from '../Conversation/Dialog';
import { music } from '../AudioSystem';
let staticConversation = {};

var storyTempletes = [
	(dialogChanged, exit) => {
		var christian = mStats.getCharacterWithName('Christian Chewbacca');
		music.play('triumph', { volume: 0.15, loop: true });
		return {
			conversation01: [
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
		var christian = mStats.getCharacterWithName('Christian Chewbacca');
		var ranual = mStats.getCharacterWithName('Raniel San Diego');
		var kasey = mStats.getCharacterWithName('Kasey Takahashi');
		music.play('triumph', { volume: 0.15, loop: true });

		return {
			conversation01: [
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
								staticConversation.index = 0;
								staticConversation.currentConversation =
									staticConversation.currentTemplete.youDoYouOption;
								dialogChanged();
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
								staticConversation.currentConversation =
									staticConversation.currentTemplete.conversation01;
								staticConversation.index = 6;
								dialogChanged();
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(christian, 'O vicky your here already, what a suprise!'),
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
					dialog: new Dialog(vicky, 'What where you going to say Christian?'),
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
						christian,
						"Look Vicky, I just didn't want you to get bord at the party. It may not be lit enoughf for you."
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
						vicky,
						"I'm going to that party! But yeah it did sound a little low key for me."
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
					dialog: new Dialog(narrator, 'At the party'),
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
						raniel,
						'Wow! Look at all the powerfull people here. Look, its Cedric, hes an up coming powerstar! O and is that...'
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
					dialog: new Dialog(christian, 'Dude shut up Raniel! You sound like a powerless jerkoff!'),
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
						vicky,
						"Hey! Let's not fight each other now, we just got here. How about we just split up and then meet when we find some power opertunities."
					),
					responses: [
						{
							title: 'Ok',
							onPress: () => {
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
								dialogChanged();
							},
						},
						{
							title: "No I'm...",
							onPress: () => {
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index = 0;
								staticConversation.endConversationProcedure(dialogChanged, exit);
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
		var mark = mStats.getCharacterWithName('Mark Noda');
		mStats.setCharacterName(narrator, { first: 'Narrator', last: '' });

		return {
			conversation01: [
				{
					dialog: new Dialog(narrator, 'Some thime lator.'),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
								dialogChanged();
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
								dialogChanged();
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index = 0;
								staticConversation.currentConversation =
									staticConversation.currentTemplete.noPowerConverSation;
								dialogChanged();
							},
						},
						{
							title: 'Yes',
							onPress: () => {
								staticConversation.index++;
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(taka, "Thats what I wanted to hear mang! Stick with me and you'll go places."),
					responses: [
						{
							title: 'Next',
							onPress: () => {
								console.log('Here just fine.');
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index++;
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
								staticConversation.index = 0;
								staticConversation.endConversationProcedure(dialogChanged, exit);
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
							onPress: () => {},
						},
						{
							title: 'Yes',
							onPress: () => {
								staticConversation.index = 17;
								staticConversation.currentConversation =
									staticConversation.currentTemplete.conversation01;
								dialogChanged();
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
					dialog: new Dialog(subJect01Obj, 'This is the fith element'),
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
					dialog: new Dialog(subJect01Obj, 'This is the sixth element'),
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
					dialog: new Dialog(subJect01Obj, 'This is the seventh element'),
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
					dialog: new Dialog(subJect01Obj, 'This is the eith element'),
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
