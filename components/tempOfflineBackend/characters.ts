var defaultCharacterKitchen = {
	power: 10,
	skill: 10,
	skillPoints: 10,
	currentStation: 'sause',
	job: 'cook',
	effectivness: 2,
	sanity: 30,
	respectability: 5,
	happyness: 1,
	cleanliness: 10,
	anger: 0,
};

var defaultCharacterServer = {
	power: 10,
	skill: 10,
	skillPoints: 10,
	currentStation: 'pantry',
	job: 'server',
	effectivness: 2,
	sanity: 30,
	respectability: 5,
	happyness: 1,
	cleanliness: 10,
	anger: 0,
};

//This data is read only
var characters = [
	{
		person: {
			name: {
				firstName: 'Xander',
				lastName: 'X',
			},
			age: 24,
			gender: 'm',
			wealth: 4,
			personality: 'consistent',
			deniedPhrase: 'Are you realy going to do this to me man',
			catchPhrase: 'Im ready to make that money',
		},
		character: defaultCharacterServer,
	},
	{
		person: {
			name: {
				firstName: 'Raniel',
				lastName: 'San Diego',
			},
			age: 28,
			gender: 'm',
			wealth: 4,
			personality: 'curious',
			deniedPhrase: 'What the! Ok then',
			catchPhrase: 'Wow, thats cool',
		},
		character: defaultCharacterKitchen,
	},
	{
		person: {
			name: {
				firstName: 'My',
				lastName: 'Tran',
			},
			age: 24,
			gender: 'm',
			wealth: 4,
			personality: 'easyGoing',
			deniedPhrase: 'Dude come on',
			catchPhrase: 'Hey, whats new with you',
		},
		character: defaultCharacterKitchen,
	},
	{
		person: {
			name: {
				firstName: 'Brad',
				lastName: 'Yanagi',
			},
			age: 24,
			gender: 'm',
			wealth: 4,
			personality: 'consistent',
			deniedPhrase: "You just can't do that",
			catchPhrase: 'Gottem',
		},
		character: defaultCharacterKitchen,
	},
	{
		person: {
			name: {
				firstName: 'John',
				lastName: 'Alvas',
			},
			age: 27,
			gender: 'm',
			wealth: 4,
			personality: 'organized',
			deniedPhrase: "This ain't gona fly",
			catchPhrase: 'Ahhhhh',
		},
		character: defaultCharacterKitchen,
	},
	{
		person: {
			name: {
				firstName: 'Anthony',
				lastName: 'Cavuoti',
			},
			age: 21,
			gender: 'm',
			wealth: 4,
			personality: 'curious',
			deniedPhrase: 'Comon man',
			catchPhrase: 'Another day is another job well done',
		},
		character: defaultCharacterKitchen,
	},
	{
		person: {
			name: {
				firstName: 'Dave',
				lastName: 'M',
			},
			age: 24,
			gender: 'm',
			wealth: 4,
			personality: 'challenging',
			deniedPhrase: "Don't tell me what to do",
			catchPhrase: 'Yeah, well, shit happens',
		},
		character: defaultCharacterKitchen,
	},
	{
		person: {
			name: {
				firstName: 'Keani',
				lastName: 'K',
			},
			age: 24,
			gender: 'f',
			wealth: 4,
			personality: 'friendly',
			deniedPhrase: "I'm not going to deal with that",
			catchPhrase: 'O dear what',
		},
		character: defaultCharacterServer,
	},
	{
		person: {
			name: {
				firstName: 'Breanna',
				lastName: 'B',
			},
			age: 24,
			gender: 'f',
			wealth: 4,
			personality: 'reserved',
			deniedPhrase: 'Uhhh ok then',
			catchPhrase: 'Haha ok',
		},
		character: defaultCharacterServer,
	},
	{
		person: {
			name: {
				firstName: 'Jesse',
				lastName: 'J',
			},
			age: 24,
			gender: 'm',
			wealth: 4,
			personality: 'confident',
			deniedPhrase: 'Yo man whats up with this! Your kidding right',
			catchPhrase: 'Yo whats up my dude',
		},
		character: defaultCharacterKitchen,
	},
	{
		person: {
			name: {
				firstName: 'Hiroki',
				lastName: 'H',
			},
			age: 23,
			gender: 'm',
			wealth: 4,
			personality: 'easyGoing',
			deniedPhrase: 'You have got to be kidding me!',
			catchPhrase: 'Hi',
		},
		character: defaultCharacterKitchen,
	},
	{
		person: {
			name: {
				firstName: 'Kevin',
				lastName: 'N',
			},
			age: 24,
			gender: 'm',
			wealth: 4,
			personality: 'friendly',
			deniedPhrase: 'O what! alright',
			catchPhrase: 'Hey whats up',
		},
		character: defaultCharacterServer,
	},
	{
		person: {
			name: {
				firstName: 'Valerie',
				lastName: 'V',
			},
			age: 22,
			gender: 'f',
			wealth: 4,
			personality: 'friendly',
			deniedPhrase: 'Geez, ok',
			catchPhrase: 'Hi, how are you',
		},
		character: defaultCharacterServer,
	},
	{
		person: {
			name: {
				firstName: 'Dio',
				lastName: 'Garcia',
			},
			age: 25,
			gender: 'm',
			wealth: 4,
			personality: 'easyGoing',
			deniedPhrase: 'Common dude',
			catchPhrase: 'How are you doing man',
		},
		character: defaultCharacterServer,
	},
	{
		person: {
			name: {
				firstName: 'Yang',
				lastName: 'Wang',
			},
			age: 23,
			gender: 'm',
			wealth: 4,
			personality: 'easyGoing',
			deniedPhrase: 'Hey are you kidding',
			catchPhrase: 'O shit what',
		},
		character: defaultCharacterKitchen,
	},
	{
		person: {
			name: {
				firstName: 'Ethan',
				lastName: 'E',
			},
			age: 24,
			gender: 'm',
			wealth: 4,
			personality: 'challenging',
			deniedPhrase: 'What the hell is your problem man',
			catchPhrase: 'O this sucks',
		},
		character: defaultCharacterKitchen,
	},
	{
		person: {
			name: {
				firstName: 'Steaven',
				lastName: 'Mugnaia',
			},
			age: 24,
			gender: 'm',
			wealth: 4,
			personality: 'friendly',
			deniedPhrase: "Don't be that way man",
			catchPhrase: 'Lol, you said that',
		},
		character: defaultCharacterServer,
	},
	{
		person: {
			name: {
				firstName: 'Justin',
				lastName: 'M',
			},
			age: 21,
			gender: 'm',
			wealth: 4,
			personality: 'consistent',
			deniedPhrase: "Please don't do that in the future",
			catchPhrase: 'Any game of league is salvageable',
		},
		character: defaultCharacterServer,
	},
	{
		person: {
			name: {
				firstName: 'Gianna',
				lastName: 'G',
			},
			age: 20,
			gender: 'f',
			wealth: 4,
			personality: 'outgoing',
			deniedPhrase: 'Aww man',
			catchPhrase: 'Yo, they call me Gia',
		},
		character: defaultCharacterServer,
	},
	{
		person: {
			name: {
				firstName: 'Josh',
				lastName: 'J',
			},
			age: 20,
			gender: 'm',
			wealth: 4,
			personality: 'confident',
			deniedPhrase: 'Can you please stop',
			catchPhrase: 'Hey dude whats up',
		},
		character: defaultCharacterKitchen,
	},
	{
		person: {
			name: {
				firstName: 'Melanie',
				lastName: 'M',
			},
			age: 23,
			gender: 'f',
			wealth: 4,
			personality: 'friendly',
			deniedPhrase: 'O what man. common',
			catchPhrase: 'Hey how are doing',
		},
		character: defaultCharacterServer,
	},
	{
		person: {
			name: {
				firstName: 'Tyler',
				lastName: 'M',
			},
			age: 22,
			gender: 'f',
			wealth: 4,
			personlaity: 'easyGoing',
			deniedPhrase: 'Ow ok then',
			catchPhrase: 'Yeah Im doing fine how are you',
		},
		character: defaultCharacterServer,
	},
	{
		person: {
			name: {
				firstName: 'Christian',
				lastName: 'Chewbacca',
			},
			age: 25,
			gender: 'm',
			wealth: 4,
			personality: 'outgoing',
			deniedPhrase: 'Dude! Whats wrong with you',
			catchPhrase: 'Yeah lets get lit man',
		},
		character: defaultCharacterKitchen,
	},
	{
		person: {
			name: {
				firstName: 'Vicky',
				lastName: 'Dang',
			},
			age: 19,
			gender: 'f',
			wealth: 4,
			personality: 'challenging',
			deniedPhrase: 'Are you serious right now',
			catchPhrase: 'Huay',
		},
		character: defaultCharacterServer,
	},
	{
		person: {
			name: {
				firstName: 'Kasey',
				lastName: 'Takahashi',
			},
			age: 25,
			gender: 'f',
			personality: 'challenging',
			deniedPhrase: 'My god your stupid',
			catchPhrase: 'Hey losers',
		},
		character: defaultCharacterServer,
	},
	{
		person: {
			name: {
				firstName: 'Mark',
				lastName: 'Noda',
			},
			age: 24,
			gender: 'm',
			personality: 'organized',
			deniedPhrase: 'Hey man you got to stop that',
			catchPhrase: 'My man',
		},
		character: defaultCharacterKitchen,
	},
	{
		person: {
			name: {
				firstName: 'Philip',
				lastName: 'P',
			},
			age: 23,
			gender: 'm',
			personality: 'reserved',
			deniedPhrase: 'Umm. alright',
			catchPhrase: 'Cool',
		},
		character: defaultCharacterServer,
	},
	{
		person: {
			name: {
				firstName: 'Taka',
				lastName: 'Okuno',
			},
			age: 24,
			gender: 'm',
			personality: 'confident',
			deniedPhrase: 'Why did you do that man',
			catchPhrase: 'Howdy mang',
		},
		character: defaultCharacterKitchen,
	},
	{
		person: {
			name: {
				firstName: 'CarloseTest',
				lastName: 'Unfinished',
			},
			age: 24,
			gender: 'm',
			personality: 'curious',
			deniedPhrase: 'Hey! Your going to fix that right',
			catchPhrase: 'Ok ok I see where your going',
		},
		character: defaultCharacterKitchen,
	},
	{
		person: {
			name: {
				firstName: 'David',
				lastName: 'H',
			},
			age: 23,
			gender: 'm',
			personality: 'outgoing',
			deniedPhrase: 'What why! Just why!',
			catchPhrase: 'Wow, thats pretty cool.',
		},
		character: defaultCharacterServer,
	},
];

export default characters;
