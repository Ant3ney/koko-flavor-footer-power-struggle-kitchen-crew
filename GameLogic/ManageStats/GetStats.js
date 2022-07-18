import util from "../../Utilities";
import characters from "../PresetsAndTemplates/testCharacters";

function GetStats(){

    //----- Player gets -----
    this.getPlayer = () => {
        //Should not be used for the purpos of seting player info
        this.gotStatsListener();
        return this.player;
    }
    this.getPFullName = () => {
        this.gotStatsListener();
        return this.player.name.get();
    }
    this.getPFirstName = () => {
        this.gotStatsListener();
        return this.player.name.getFirst();
    }
    this.getPLastName = () => {
        this.gotStatsListener();
        return this.player.name.getLast();
    }
    this.getPAge = () => {
        this.gotStatsListener();
        return this.player.getAge();
    }
    this.getPGender = () => {
        this.gotStatsListener();
        return this.player.getGender();
    }
    this.getPWealth = () => {
        this.gotStatsListener();
        return this.player.getWealth();
    }
    this.getPPersonality = () => {
        this.gotStatsListener();
        return this.player.getPersonality();
    },
    this.getPSkillPointsUsed = () => {
        this.gotStatsListener();
        return this.pSkillPointsUsed;
    }
    this.getPPower = () => {
        this.gotStatsListener();
        return this.player.getPower();
    }
    this.getPSkill = () => {
        this.gotStatsListener();
        return this.player.getSkill();
    }
    this.getPSkillPoints = () => {
        this.gotStatsListener();
        return this.player.getSkillPoints();
    }
    this.getPCurrentStation = () => {
        this.gotStatsListener();
        return this.player.getCurrentStation();
    }
    this.getPJob = () => {
        this.gotStatsListener();
        return this.player.getJob();
    }
    this.getPEffectivness = () => {
        this.gotStatsListener();
        return this.player.getEffectivness();
    }
    this.getPSanity = () => {
        this.gotStatsListener();
        return this.player.getSanity();
    }
    this.getPEnergy = () => {
        this.gotStatsListener();
        return this.player.getEnergy();
    }
    this.getPStation = () => {
        this.gotStatsListener();
        return this.player.getCurrentStation();
    }
    this.getPRespectability = () => {
        this.gotStatsListener();
        return this.player.getRespectability();
    }
    this.getPHappyness = () => {
        this.gotStatsListener();
        return this.player.getHappyness();
    }
    this.getPCleanliness = () => {
        this.gotStatsListener();
        return this.player.getCleanliness();
    }
    this.getPAnger = () => {
        this.gotStatsListener();
        return this.player.getAnger();
    }
    this.getPEffectivnessGain = () => {
        this.gotStatsListener();
        return this.totaleffectivnessGain;
    }

    //----- Character gets -----
    this.getRandomCharacter = (inShift) => {
        if(inShift){
            var randomIndex = util.getRandomIndexFromArray(this.shiftCharacters);
            this.gotStatsListener();
            return this.shiftCharacters[randomIndex];
        }
        else{
            var randomIndex = util.getRandomIndexFromArray(this.characters);
            this.gotStatsListener();
            return this.characters[randomIndex];
        }
    }
    this.getRandomServer = (inShift) => {
        var randomIndex;
        var returnCharacter;

        if(inShift){
            randomIndex = util.getRandomIndexFromArray(this.shiftCharacters);
            returnCharacter = this.shiftCharacters[randomIndex];

            while(this.isCook(returnCharacter)){
                randomIndex = util.getRandomIndexFromArray(this.shiftCharacters);
                returnCharacter = this.shiftCharacters[randomIndex];
            }
        }
        else{
            randomIndex = util.getRandomIndexFromArray(this.characters);
            returnCharacter = this.characters[randomIndex];

            while(this.isCook(returnCharacter)){
                randomIndex = util.getRandomIndexFromArray(this.characters);
                returnCharacter = this.characters[randomIndex];
            }
        }
        
        this.gotStatsListener();
        return returnCharacter;
    }
    this.getRandomeCharacterWhosNot = (notArray, inShift) => {
        var avalibleArray = this.getCharacterAryWhosNot(notArray, inShift);
        var randomIndex = util.getRandomIndexFromArray(avalibleArray);

        return avalibleArray[randomIndex];
    }
    this.getCharacterAryWhosNot = (notArray, inShift) => {
        var characterAry = [];
        var name;
        var nameInvalid;

        if(inShift){
            this.shiftCharacters.forEach((character, i) => {
                name = character.name.get();
                nameInvalid = false;
                
                for(var j = 0; j < notArray.length; j++){
                    if(notArray[j].name.get() === name){
                        nameInvalid = true;  
                    }
                }
    
                if(!nameInvalid){
                    characterAry.push(character);
                }
            });
        }
        else{
            this.characters.forEach((character, i) => {
                name = character.name.get();
                nameInvalid = false;
                
                for(var j = 0; j < notArray.length; j++){
                    if(notArray[j].name.get() === name){
                        nameInvalid = true;  
                    }
                }
    
                if(!nameInvalid){
                    characterAry.push(character);
                }
            });
        }

        this.gotStatsListener();
        return characterAry;
    }
    this.getCharacterOfPersonalityWhosNot = (personality, notArray, inShift) => {
        var avalibleCharacters = this.getCharacterAryWhosNot(notArray, inShift);
        var searchedPersonalityArry = [];

        avalibleCharacters.forEach((character) => {
            if(character.getPersonality() === personality){
                searchedPersonalityArry.push(character);
            }
        });

        if(searchedPersonalityArry.length === 0){//There are no new characters of searched personality
            var randomIndex = util.getRandomIndexFromArray(avalibleCharacters);
            this.gotStatsListener();
            return avalibleCharacters[randomIndex];
        }

        var randomIndex = util.getRandomIndexFromArray(searchedPersonalityArry);
        this.gotStatsListener();
        return searchedPersonalityArry[randomIndex];
    }
    this.getCharacterWithName = (name) => {
        var match = null;
        this.characters.forEach((character) => {
            if(character.name.get() === name){
                match = character;
            }
        });

        this.gotStatsListener();
        return match;
    }
    this.getEitherCharacterWhosNot = (charactersAry, notAry) => {
        var retCharacter;
        var characterName;
        var notName;
        var breakBool = false;

        for(var i = 0; i < notAry.length; i++){
            console.log("working with notAry[" + i + "]: " + notAry[i]);
            notName = notAry[i].name.get();
            for(var j = 0; j < charactersAry.length; j++){
                characterName = charactersAry[j].name.get();
                if(characterName !== notName){
                    breakBool = true;
                    retCharacter = charactersAry[j];
                    break;
                }
                if(breakBool){
                    break
                }
            }
        }

        return retCharacter;
    }
    this.getMostPowerFullCharacter = (notAry, shift) => {
        var retCharacter = null;

        if(shift){

        }
        else{
            retCharacter = this.getRandomeCharacterWhosNot(notAry);
            this.characters.forEach((character) => {
                if(character.getPower() > retCharacter.getPower()){
                    //Loop through not array and see of iy matches most power character
                    for(var i = 0; i < notAry.length; i++){
                        if(notAry[i].name.get() === character.name.get()){
                            break;
                        }
                    }

                    //If this code is reached then retCharacter is currently most powerfull and is not in not array
                    retCharacter = character;
                }
            });
        }

        return retCharacter;
    }
    this.getRandomCook = (inShift) => {
        var randomIndex;
        var returnCharacter;

        if(inShift){
            randomIndex = util.getRandomIndexFromArray(this.shiftCharacters);
            returnCharacter = this.shiftCharacters[randomIndex];

            while(!this.isCook(returnCharacter)){
                randomIndex = util.getRandomIndexFromArray(this.shiftCharacters);
                returnCharacter = this.shiftCharacters[randomIndex];
            }
        }
        else{
            randomIndex = util.getRandomIndexFromArray(this.characters);
            returnCharacter = this.characters[randomIndex];
            
            while(!this.isCook(returnCharacter)){
                randomIndex = util.getRandomIndexFromArray(this.characters);
                returnCharacter = this.characters[randomIndex];
            }
        }
          
        this.gotStatsListener();
        return returnCharacter;
    }
    this.getRandomCookWhosNot = (fullName, inShift) => {
        var randomIndex;
        var returnCharacter
        if(inShift){
            randomIndex = util.getRandomIndexFromArray(this.shiftCharacters);
            returnCharacter = this.shiftCharacters[randomIndex];

            while(returnCharacter.name.get() === fullName || !this.isCook(returnCharacter)){
                randomIndex = util.getRandomIndexFromArray(this.shiftCharacters);
                returnCharacter = this.shiftCharacters[randomIndex];
            }
        }
        else{
            randomIndex = util.getRandomIndexFromArray(this.characters);
            returnCharacter = this.characters[randomIndex];

            while(returnCharacter.name.get() === fullName && !this.isCook(returnCharacter)){
                randomIndex = util.getRandomIndexFromArray(this.characters);
                returnCharacter = this.characters[randomIndex];
            }
        }
        
          
        this.gotStatsListener();
        return returnCharacter;
    }
    this.getCookArray = (inShift) => {
        var cookAry = [];
        var characterParsAry;
        if(inShift){
            characterParsAry = this.shiftCharacters;
        }
        else{
            characterParsAry = this.characters;
        }
        characterParsAry.forEach((character) => {
            if(character.getJob === "cook"){
                cookAry.push(character);
            }
        });

        this.gotStatsListener();
        return characterParsAry;
    }
    this.getCookFromStation = (station) => {
        var cooks = this.getCookArray(true);
        cooks.forEach(cook => {
            if(cook.getCurrentStation() === station){
                this.gotStatsListener();
                return cook;
            }
        });
    }
    this.getGenderPronounOfCharacter = (character, cap) => {
        this.gotStatsListener();
        if(character.getGender() === "m"){
            if(cap){
                return "He";
            }
            return "he";
        }
        if(cap){
            return "She";
        }
        return "she";
    }
    this.getGenderPossessiveCharacter = (character) => {
        this.gotStatsListener();
        if(character.getGender() === "m"){
            return "his";
        }
        return "her";
    }
    this.getCharacterByFullName = (fullName) => {
        var ret = null;
        this.characters.forEach((character) => {
            var characterName = character.name.get();
            if(characterName === fullName){
                ret = character;
            }
        });

        return ret;
    }
    this.getCRespectability = (character) => {
        this.gotStatsListener();
        return character.getRespectability();
    }

    //Shift schedule gets
    this.getCharacterArysFromScheduleDay = (shiftStructure, day) => {
        var dayCharacters = [];
        var nightCharacters = [];
        var characterName;
        var fullName;
        var mStatsCharacter;

        //Create Day Characters refrence array
        var characterDataAry = shiftStructure[day]["day"];
        characterDataAry.forEach((character) => {
            characterName = character.person.name
            fullName = characterName.firstName + " " + characterName.lastName;
            mStatsCharacter = this.getCharacterByFullName(fullName);

            dayCharacters.push(mStatsCharacter);
        });
        
        //Create night characters refrence array
        characterDataAry = shiftStructure[day]["night"];
        characterDataAry.forEach((character) => {
            characterName = character.person.name;
            fullName = characterName.firstName + " " + characterName.lastName;
            mStatsCharacter = this.getCharacterByFullName(fullName);

            nightCharacters.push(mStatsCharacter);
        });

        return {
            day: dayCharacters,
            night: nightCharacters
        }
    },
    this.createScheduleWithShiftStructure = (shiftStructure) => {
        return {
            monday: this.getCharacterArysFromScheduleDay(shiftStructure, "monday"),
            tuesday: this.getCharacterArysFromScheduleDay(shiftStructure, "tuesday"),
            wednesday: this.getCharacterArysFromScheduleDay(shiftStructure, "wednesday"),
            thursday: this.getCharacterArysFromScheduleDay(shiftStructure, "thursday"),
            friday: this.getCharacterArysFromScheduleDay(shiftStructure, "friday"),
            saturday: this.getCharacterArysFromScheduleDay(shiftStructure, "saturday"),
            sunday: this.getCharacterArysFromScheduleDay(shiftStructure, "sunday"),
        }
    }
    this.getCharacterSchedule = () => {
        this.gotStatsListener();
        return this.characterSchedule;
    }
    this.getCharacterScheduleViaShiftPreset = (preset) => {
        return this.characterSchedule[preset.dayName][preset.difficulty.lighting];
    }
    this.getCharactersWhoAreStongerThanPlayer = () => {
        var strongerCharacters = [];
        var playerPower = this.player.getPower();
        var characterPower;
        this.characters.forEach((character) => {
            characterPower = character.getPower();
            if(characterPower > playerPower){
                strongerCharacters.push(character);
            }
        });

        this.gotStatsListener();
        return strongerCharacters;
    }
    //----- Environment gets -----
    this.getEnvironment = () => {
        this.gotStatsListener();
        return this.environment;
    }
    this.getCurrentBusyness = () => {
        this.gotStatsListener();
        return this.environment.busyness.getCurrent();
    }
    this.getCurrentBusyAry = () => {
        this.gotStatsListener();
        return this.environment.busyness.getCurrentAry();
    }
    this.getTime = () => {
        this.gotStatsListener();
        return this.environment.time;
    }
    this.getLighting = () => {
        this.gotStatsListener();
        return this.environment.lighting;
    }
    this.getHours = () => {
        var time = this.environment.time;
        this.gotStatsListener();
        retrun (Math.floor(time / 100));
    }
    this.getMinutes = () => {
        this.gotStatsListener();
        return (this.environment.time % 100);
    }
    this.getBusyness = () => {
        return this.environment.busyness.getCurrent();
    }

    //Misc gets
    this.getScenarioPresent = () => {
        this.gotStatsListener();
        return this.scenarioPresent;
    }
    this.getInForground = () => {
        this.gotStatsListener();
        return this.inForground;
    }
    this.getCurrentDay = () => {
        this.gotStatsListener();
        return this.currentDay;
    }
    this.getDayArry = () => {
        this.gotStatsListener();
        return ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    }
    this.getShiftCharacters = () => {
        this.gotStatsListener();
        return this.shiftCharacters;
    }
    this.getNavigator = () => {
        return this.gameDriver.getNavigator();
    }
    this.hasAlreadyWon = () => {
        return this.alreadyWon;
    }
    this.determinLoseCondition = () => {
        var lost = false;
        var characterPower;
        this.characters.forEach((character) => {
            characterPower = character.getPower();
            if(characterPower >= 10000){
                lost = true;
            }
        });
        if(this.player.getPower() <= -100){
            lost = true;
        }

        return lost;
    }
}

export default GetStats;