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
   a. Fix lose event.
   b. In chapter 03 of the story, a lot of dialog is missing.
   Extend credits to include all voice actors.

# Development

All occurrences of BackEnd Offline will be followed by commented out code that fetches data from back end.
When new backend solution presents itself. Re-implement fetch code.
