import mStats from "./ManageStats/ManageStats";

var chapter;//capter is the index that is used for story element conversation
var chapterQue = [];

var storyLogic = {
    init: (data) => {
        chapter = data.initialChapter;
    },
    getChapter: () => {
        return chapter;
    },
    getChapterQue: () => {
        return chapterQue;
    },
    checkForUnhandledStory: () => {
        var power = mStats.getPPower();

        var ret = false
        inflections.forEach((inflection, i) => {
            if(power >= inflection && i >= chapter){
                ret = true;
            }
        });

        return ret;
    },
    fillChapterQueAndChapter: () => {
        while(storyLogic.checkForUnhandledStory()){
            chapterQue.push(chapter);
            chapter++;
        }
    },
    checkForUnhandledStoryAndFillChapterQueAndChapter: () => {
        fillChapterQueAndChapter();//Lol
    },
    chaptersLeft: () => {
        if(chapterQue.length > 0){
            return true
        }
        return false
    },
    getCurrentUnhandledChapter: () => {
        return chapterQue[0];
    },
    deQueChapter: () => {
        var ret = chapterQue[0];
        chapterQue.splice(0, 1);

        return ret;//I return becaue I might as well
    },
    getInflectionsArry: () => {
        return inflections;
    },
    isLastChapter: (chapter) => {
        if(chapter === inflections.length - 1){
            return true;
        }
        return false;
    }
}

var inflections = [//When the player's power is grater than these inflections then play the next story conversation
    50, 100, 500, 1000, 1500, 2000, 4000, 5000, 6000, 8000, 9000, 10000
];

export default storyLogic;