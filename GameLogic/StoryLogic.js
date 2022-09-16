import mStats from './ManageStats/ManageStats';
//This file should be seen as tools that are used in facilitator functions

export var chapter; //capter is the index that is used for story element conversation
var chapterQue = [];
let initialChapter = 0;

var storyLogic = {
	init: data => {
		chapter = data.initialChapter;
	},
	getChapter: () => {
		return chapter;
	},
	getUnfinishedChapterQue: () => {},
	getChapterQue: () => {
		return chapterQue;
	},
	checkForUnhandledStory: () => {
		var power = mStats.getPPower();

		var ret = false;
		inflections.forEach((inflection, i) => {
			if (power >= inflection && i >= chapter) {
				ret = true;
			}
		});

		return ret;
	},
	clearChapterQue: () => {
		for (let i = 0; i < chapterQue.length; i++) {
			storyLogic.deQueChapter();
		}
	},
	fillChapterQueAndChapter: () => {
		while (storyLogic.checkForUnhandledStory()) {
			chapterQue.push(chapter);
			chapter++;
		}
	},
	checkForUnhandledStoryAndFillChapterQueAndChapter: () => {
		fillChapterQueAndChapter(); //Lol
	},
	chaptersLeft: () => {
		if (chapterQue.length > 0) {
			return true;
		}
		return false;
	},
	getCurrentUnhandledChapter: () => {
		return chapterQue[0];
	},
	deQueChapter: () => {
		var ret = chapterQue[0];
		chapterQue.splice(0, 1);

		return ret; //I return becaue I might as well
	},
	getInflectionsArry: () => {
		return inflections;
	},
	isLastChapter: chapter => {
		if (chapter === inflections.length - 1) {
			return true;
		}
		return false;
	},
};

var inflections = [
	//When the player's power is grater than these inflections then play the next story conversation
	50, 100, 500, 1000, 1500, 2000, 4000, 5000, 6000, 8000, 9000, 10000,
];

export default storyLogic;
