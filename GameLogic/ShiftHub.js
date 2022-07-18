import mStats from "./ManageStats/ManageStats";

var dayIndex = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

var shiftHub = {
    init: (availableDays) => {
        shiftHub.availableDays = availableDays;
    },
    availableDays: {
        monday: {
            day: true,
            night: true
        },
        tuesday: {
            day: true,
            night: true
        },
        wednesday: {
            day: true,
            night: true
        },
        thursday: {
            day: true,
            night: true
        },
        friday: {
            day: true,
            night: true
        },
        saturday: {
            day: true,
            night: true
        },
        sunday: {
            day: true,
            night: true
        }
    },
    freeUpAllDays: () => {
        var availableDays = shiftHub.availableDays;
        for(var weekDay in availableDays){
            availableDays[weekDay].day = true;
            availableDays[weekDay].night = true;
        }
    },
    lockOffDay: (day) => {
        shiftHub.availableDays[day].day = false;
        shiftHub.availableDays[day].night = false;
    },
    lockOffDayDay: (day) => {
        shiftHub.availableDays[day].day = false;
    },
    lockDaysUpTo: (day, settings) => {
        settings = settings || {};
        settings.keepNight = settings.keepNight || false;
        var availableDays = shiftHub.availableDays;

        if(settings.keepNight){
            for(var weekDay in availableDays){
                availableDays[weekDay].day = false;
                if(weekDay === day){
                    break;
                }
                availableDays[weekDay].night = false;
            }
        }
        else{
            for(var weekDay in availableDays){
                shiftHub.lockOffDay(weekDay);
                if(weekDay === day){
                    break;
                }
            }
        }
    },
    manageDaysUpTo: (day, settings) => {
        var dayName = day.dayName;
        var lighting = day.difficulty.lighting;
        shiftHub.lockDaysUpTo(dayName, settings);

        //aply consiquences
        //apply up to day before
        mStats.setCharacterConsequencesUpTo(dayName, settings);
        //apply for day shift or night shift depending on current gameplay lighting
        if(!settings){//By default play this code is settings is not suplyed and aplyWholeDay is not suplyed
            if(lighting === "day"){
                //aply consequences for night
                mStats.setCharacterConsequencesOnDay(mStats.getCurrentDay(), "night");
            }
            else{//lighting = day
                //aply consequences for day
                mStats.setCharacterConsequencesOnDay(mStats.getCurrentDay(), "day");
            }
        }
        else if(settings.aplyWholeDay){
            //aply consequences for day and night
            mStats.setCharacterConsequencesOnDay(mStats.getCurrentDay());
        }

        //I may want to move this to the quit function in game driver
        mStats.setCurrentDay(shiftHub.getNextDay(dayName));
    },
    getDisabledOf: (day) => {
        return !(shiftHub.availableDays[day].day && shiftHub.availableDays[day].night);
    },
    getNextDay: (day) => {
        var dayInd = dayIndex.indexOf(day);
        if((dayInd + 1) === dayIndex.length){
            return dayIndex[0];
        }
        return dayIndex[dayInd + 1];
    }
}

export default shiftHub;