import mStatsUtil from "../ManageStats/manageStatsUtilities";

var settings = {
    dayEasy: {
        difficulty: "easy",
        lighting: "day"
    },
    nightEasy: {
        difficulty: "easy",
        lighting: "night"
    },
    dayMedium: {
        difficulty: "medium",
        lighting: "day"
    },
    nightMedium: {
        difficulty: "medium",
        lighting: "night"
    },
    dayHard: {
        difficulty: "hard",
        lighting: "day"
    },
    nightHard: {
        difficulty: "hard",
        lighting: "night"
    }
}

var shiftPresets = (dayName) => {
    var days = {
        monday: {
            day: {
                difficulty: settings.dayEasy,
                dayName: dayName
            },
            night: {
                difficulty: settings.nightMedium,
                dayName: dayName
            }
        },
        tuesday: {
            day: {
                difficulty: settings.dayEasy,
                dayName: dayName
            },
            night: {
                difficulty: settings.nightMedium,
                dayName: dayName
            }
        },
        wednesday: {
            day: {
                difficulty: settings.dayEasy,
                dayName: dayName
            },
            night: {
                difficulty: settings.nightMedium,
                dayName: dayName
            }
        },
        thursday: {
            day: {
                difficulty: settings.dayEasy,
                dayName: dayName
            },
            night: {
                difficulty: settings.nightMedium,
                dayName: dayName
            }
        },
        friday: {
            day: {
                difficulty: settings.dayMedium,
                dayName: dayName
            },
            night: {
                difficulty: settings.nightHard,
                dayName: dayName
            }
        },
        saturday: {
            day: {
                difficulty: settings.dayMedium,
                dayName: dayName
            },
            night: {
                difficulty: settings.nightHard,
                dayName: dayName
            }
        },
        sunday: {
            day: {
                difficulty: settings.dayMedium,
                dayName: dayName
            },
            night: {
                difficulty: settings.nightHard,
                dayName: dayName
            }
        }, 
    };

    return days[dayName];
}

export default shiftPresets;