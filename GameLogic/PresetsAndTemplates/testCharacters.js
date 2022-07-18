var defaultCharacterKitchen = {
    power: 10,
    skill: 10,
    skillPoints: 10,
    currentStation: "sause",
    job: "cook",
    effectivness: 2,
    sanity: 30,
    respectability: 5,
    happiness: 1,
    cleanliness: 10,
    Anger: 0
}

var defaultCharacterServer = {
    power: 10,
    skill: 10,
    skillPoints: 10,
    currentStation: "pantry",
    job: "server",
    effectivness: 2,
    sanity: 30,
    respectability: 5,
    happiness: 1,
    cleanliness: 10,
    Anger: 0
}

//This data is read only
var characters = [
    {
        person: {
            name: {
                firstName: "Xander",
                lastName: "X"
            },
            age: 24,
            gender: "m",
            wealth: 4,
            personality: "consistant",
            deniedPhrase: "Are you realy going to do this to me man",
            catchPhrase: "Im ready to make that money"
        },
        character: defaultCharacterServer
    },
    {
        person: {
            name: {
                firstName: "Raniel",
                lastName: "San Diego"
            },
            age: 28,
            gender: "m",
            wealth: 4,
            personality: "curious",
            deniedPhrase: "What the! Ok then",
            catchPhrase: "Wow, thats cool"
        },
        character: defaultCharacterKitchen
    },
    {
        person: {
            name: {
                firstName: "My",
                lastName: "Tran"
            },
            age: 24,
            gender: "m",
            wealth: 4,
            personality: "easy going",
            deniedPhrase: "Dude come on",
            catchPhrase: "Hey, whats new with you"
        },
        character: defaultCharacterKitchen
    },
    {
        person: {
            name: {
                firstName: "Brad",
                lastName: "Yanagi"
            },
            age: 24,
            gender: "m",
            wealth: 4,
            personality: "consistant",
            deniedPhrase: "You just can't do that",
            catchPhrase: "Gottem"
        },
        character: defaultCharacterKitchen
    },
    {
        person: {
            name: {
                firstName: "John",
                lastName: "Alvas"
            },
            age: 27,
            gender: "m",
            wealth: 4,
            personality: "organized",
            deniedPhrase: "This aint gona fly",
            catchPhrase: "Ahhhhh"
        },
        character: defaultCharacterKitchen
    },
    {
        person: {
            name: {
                firstName: "Anthony",
                lastName: "Cavuoti"
            },
            age: 21,
            gender: "m",
            wealth: 4,
            personality: "curious",
            deniedPhrase: "Comon man",
            catchPhrase: "Anthother day is another job well done"
        },
        character: defaultCharacterKitchen
    },
    {
        person: {
            name: {
                firstName: "Dave",
                lastName: "M"
            },
            age: 24,
            gender: "m",
            wealth: 4,
            personality: "challenging",
            deniedPhrase: "Don't tell me what to do",
            catchPhrase: "Yeah, well, shit happeons"
        },
        character: defaultCharacterKitchen
    },
    {
        person: {
            name: {
                firstName: "Keani",
                lastName: "K"
            },
            age: 24,
            gender: "f",
            wealth: 4,
            personality: "friendly",
            deniedPhrase: "I'm not going to deal with that",
            catchPhrase: "O dear what"
        },
        character: defaultCharacterServer
    },
    {
        person: {
            name: {
                firstName: "Breanna",
                lastName: "B"
            },
            age: 24,
            gender: "f",
            wealth: 4,
            personality: "reserved",
            deniedPhrase: "Uhhh ok then",
            catchPhrase: "Haha ok"
        },
        character: defaultCharacterServer
    },
    {
        person: {
            name: {
                firstName: "Jesse",
                lastName: "J"
            },
            age: 24,
            gender: "m",
            wealth: 4,
            personality: "confident",
            deniedPhrase: "Yo man whats up with this! Your kidding right",
            catchPhrase: "Yo whats up my dude"
        },
        character: defaultCharacterKitchen
    }
]

export default characters;