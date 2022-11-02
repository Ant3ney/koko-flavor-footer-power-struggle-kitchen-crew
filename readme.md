# ココ Flavor Fodder. Power struggle. Kitchen crew.

## To Play

visit https://koko-flavor-fodder.netlify.app to play current build

## Installation

-   Make sure you have the expo cli installed already
-   Run npm install in repo directory
-   Run expo start

## Music Update Coming Soon.

### TODOS

1. Implement character dialog audio.
   a. Get an even number of voice acting audio files. X
   b. Create script to check if all files are there. X
   c. Create a js script that creates a js file that imports all the voice Audio Files in the current directory and exports those files as a js object. X
2. Clean up StartMenu Component. X
3. Make game-server independent. X
4. Add code to load in audio before start menu is displayed.
   Create test for async code that check for an API that fires once when audio starts loading and once when it has finished loading. Consider using enzyme for react native.X
5. Make small QA tweaks where possible.
   a. Fix lose event. X
   b. In chapter 03 of the story, a lot of dialog is missing. It turned out, nothing was missing. Ch 03 just ends abruptly. X
   Extend credits to include all voice actors. X
   c. Add emotions to dialog.
   d. Hide upgrade menu
   e. Time dose not progress when you play two shifts in one session. This bug just disappeared. If it ever returns, consider that it may have come from the fact that the kitchen (gameplay) component did not re run because the navigation stack could have kept it awake the entire time the player in not playing gameplay. I ended up changing a few navigation.navigate function calls to navigation.push instead. This seems to reduce the frequency of this kind of error.
6. Create Monday Morning and Nostalgic Morning Music.
7. Implement music to gameplay.
8. Create media for Music Update.
9. Post media to social media.

# Development

All occurrences of will be followed by commented out code that fetches data from back end.
When new backend solution presents itself. Re-implement fetch code.

## Navigation based bugs

This app uses @reactnavigation to handle what views to display to the user. This system comes with many caviouts and will be the cause of many bugs. Firstly, when you navigate to a new nav, it dose not destry the old nav you where just on. This means that if you navigate back to you original nav after navigating to your new nav, the original nav's component will not call the initialization functions. To solve the bugs that arise from this atrribute of navs I have decided to make it so there are no duplicate nav stack screens. Competent may be duplicated but not nav stack screens.

## Bug bounties

1. Sometimes, gameplay dose not work until user exits the tab and comes back. X
   Solution. Navigated to different views not but calling a navigation.navigate but instead created a reset action that also changeless the current navigation route. Then had the navigation code dispatch this action.
