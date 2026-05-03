# Scenario System Guide

This project spells the feature as `Scenario` in code, even when comments or notes may say `senerio`/`scenerio`.

## What the Scenario System Does

Scenarios are random decision interrupts during gameplay. When one appears, normal timed gameplay pauses, the player sees a prompt, chooses one of the buttons, gets an outcome message, and then acknowledges the result to return to the kitchen.

The system has four main parts:

- `GameLogic/GameDriver/GameDriver.js` decides when a scenario should appear.
- `components/content/Kitchen.js` shows or hides the scenario modal.
- `GameLogic/Scenario/Scenario.js` creates a scenario instance, manages the timer, and exposes prompt/button callbacks to React.
- `GameLogic/PresetsAndTemplates/ScenarioTempletes.js` contains the actual scenario content, choices, stat effects, and timeout effects.

## Runtime Flow

1. `Kitchen` mounts during gameplay and registers a `tic` callback:

   ```js
   this.gameDriver.on('tic', () => {
     if (this.gameDriver.scenarioCheck().reply) {
       this.setScenerio(true);
     }
   });
   ```

2. `GameDriver.scenarioCheck()` rolls a random chance:

   ```js
   if (Math.round(Math.random() * 10) <= 1) {
     result.reply = true;
     mStats.setScenarioPresent(true);
   }
   ```

   This is roughly a 2-in-11 chance per game tic because `Math.round(Math.random() * 10)` can produce `0` or `1`.

3. `Kitchen.setScenerio(true)` updates React state and `mStats.scenarioPresent`.

4. `GameDriver.determinePause()` returns `false` while a scenario is present. That means normal `tic()` time/power/busyness updates pause.

5. `Kitchen` renders `components/content/Scenario.js`.

6. `components/content/Scenario.js` creates one `new ScenarioKit()` from `GameLogic/Scenario/Scenario.js`.

7. `ScenarioKit` randomly picks one template from `scenariosTempletes`, stores it in `StaticScenario.currentScenario`, and copies its starting prompt into `StaticScenario.prompt`.

8. The modal displays:

   - `scenario.getPrompt()`
   - `scenario.getCurrentTime()`
   - `scenario.getButtons()`

9. If the player presses a choice, that choice's `onPress` runs from the template. It should:

   - play `click()`
   - replace `StaticScenario.prompt` with the outcome text
   - apply stat consequences with `mStats`
   - call `StaticScenario.handleOnPress()`

10. `handleOnPress()` calls the React callback registered by `components/content/Scenario.js`. That callback refreshes the prompt, stops the scenario timer, and swaps the choice buttons for an `Acknowledge` button.

11. Pressing `Acknowledge` calls `scenario.quit()`, clears the singleton `scenario` variable in the React component, and calls `props.setScenerio(false)`.

12. `Kitchen.setScenerio(false)` sets `mStats.scenarioPresent` back to `false`, so normal gameplay resumes.

## Timer Flow

The timer is managed in `GameLogic/Scenario/Scenario.js`.

When a `ScenarioKit` is created, it registers a `continue` callback with the game driver:

```js
gameDriver.on(
  'continue',
  () => {
    this.continueTime();
  },
  'scenario counter'
);
```

`GameDriver.update()` always advances `continusTime()` every 60 frames, even while the normal game tic is paused. That means scenario countdowns continue while the scenario modal is open.

The initial timer value is:

```js
StaticScenario.currentScenario.maxTime * getMaxTimeMultiplyer()
```

`getMaxTimeMultiplyer()` currently uses a hard-coded `difficulty = 'dyslexic'`, so every scenario gets a `4x` timer multiplier.

When the timer reaches zero, the template's `onTimeout()` runs. The timeout should update `StaticScenario.prompt`, apply consequences, and call `StaticScenario.handleOnTimeOut()`.

## Template Shape

All scenario templates live in:

```txt
GameLogic/PresetsAndTemplates/ScenarioTempletes.js
```

`scenariosTempletes` is an array of functions. Each function returns a scenario object:

```js
() => {
  var subjectObj = mStats.getRandomServer(true);
  var subject = subjectObj.name.getFirst();

  return {
    prompt: subject + ' asks you a kitchen problem.',
    buttons: [
      {
        title: 'Answer A',
        onPress: () => {
          click();
          StaticScenario.prompt = 'Outcome text for Answer A\n+10 Power';
          mStats.addPPower(10);
          StaticScenario.handleOnPress();
        },
      },
      {
        title: 'Answer B',
        onPress: () => {
          click();
          StaticScenario.prompt = 'Outcome text for Answer B\n-10 Sanity';
          mStats.addPSanity(-10);
          StaticScenario.handleOnPress();
        },
      },
    ],
    maxTime: 10,
    onTimeout: () => {
      StaticScenario.prompt = 'Timeout outcome text\n-10 Effectiveness';
      mStats.addPEffectivness(-10);
      StaticScenario.handleOnTimeOut();
    },
  };
}
```

To add a scenario, add another function to the `scenariosTempletes` array before the closing `]`.

## Important Global State

`GameLogic/Scenario/StaticScenario.js` is a shared mutable object:

```js
var StaticScenario = {
  currentTime: null,
  prompt: 'This is a scenario',
  onPress: null,
  onTic: null,
  onTimeout: null,
  currentScenario: null,
}
```

Templates write outcome text into `StaticScenario.prompt`. The React component reads that prompt after `StaticScenario.handleOnPress()` or `StaticScenario.handleOnTimeOut()` fires.

This means each scenario should always call one of these after applying consequences:

- `StaticScenario.handleOnPress()` for a button choice
- `StaticScenario.handleOnTimeOut()` for a timeout

If you forget that call, the UI will not move from choice mode to acknowledge mode.

## Useful `mStats` Helpers

Scenario templates use `mStats` to find characters and change stats.

Common player stat helpers:

- `mStats.addPPower(amount)`
- `mStats.subtractPPower(amount)`
- `mStats.addPEffectivness(amount)`
- `mStats.subtractPEffectivness(amount)`
- `mStats.addPSanity(amount)`
- `mStats.addPAnger(amount)`
- `mStats.addPCleanliness(amount)`
- `mStats.addPRespectability(amount)`
- `mStats.addPSkillPoints(amount)`
- `mStats.getPRespectability()`

Common character lookup helpers:

- `mStats.getRandomServer(true)`
- `mStats.getRandomCook(true)`
- `mStats.getRandomCharacter(true)`
- `mStats.getRandomCookWhosNot(name, true)`
- `mStats.getRandomeCharacterWhosNot([character], true)`
- `mStats.getCookFromStation('frier')`
- `mStats.getShiftCharacters()`

Common character stat helpers:

- `mStats.addCPower(character, amount)`
- `mStats.addCSanity(character, amount)`
- `mStats.addCEffectivness(character, amount)`
- `mStats.addCAnger(character, amount)`
- `mStats.addCRespectability(character, amount)`
- `mStats.getCRespectability(character)`
- `mStats.getGenderPronounOfCharacter(character)`
- `mStats.getGenderPossessiveCharacter(character)`

## Respectability Pattern

Several scenarios reduce power like this:

```js
var playerRespect = mStats.getPRespectability();
mStats.subtractPPower(20 - playerRespect);
```

That means high player respect softens penalties. Some rewards add respect to the reward:

```js
mStats.addPPower(20 + playerRespect);
```

Character penalties sometimes use the same idea:

```js
var characterRespectiblity = mStats.getCRespectability(character);
mStats.addCPower(character, -100 + characterRespectiblity);
```

Use this pattern when the outcome should be affected by how respected the player or character already is.

## UI Behavior

`components/content/Scenario.js` has two states:

- Before a choice/timeout: show prompt, timer, and all scenario buttons.
- After a choice/timeout: show updated outcome prompt and a single `Acknowledge` button.

The modal does not inspect stat changes directly. It only reads `StaticScenario.prompt` and waits for callbacks.

## Current Quirks To Watch

- The file is named `ScenarioTempletes.js`, not `ScenarioTemplates.js`.
- `components/content/Kitchen.js` and props use `setScenerio`, not `setScenario`.
- `timesUp` in `Scenario.js` is module-level state, not instance state.
- `StaticScenario` is global mutable state. Avoid creating more than one active scenario at once.
- `scenarioCheck()` can trigger often because it rolls every game tic while gameplay is unpaused.
- `getMaxTimeMultiplyer()` currently ignores actual game difficulty and uses the hard-coded `difficulty` constant.
- One existing template has duplicate `title` and `onPress` keys inside the same button object near the "extra cheese topping" scenario. In JavaScript, the later duplicate keys overwrite the earlier ones, so that object only keeps the second title/handler.

## Checklist For Adding A New Scenario

1. Open `GameLogic/PresetsAndTemplates/ScenarioTempletes.js`.
2. Add a new `() => ({ ... })` function to the `scenariosTempletes` array.
3. Build all dynamic names before the returned object.
4. Return `prompt`, `buttons`, `maxTime`, and `onTimeout`.
5. In every button `onPress`, call `click()`, set `StaticScenario.prompt`, apply `mStats` consequences, then call `StaticScenario.handleOnPress()`.
6. In `onTimeout`, set `StaticScenario.prompt`, apply `mStats` consequences, then call `StaticScenario.handleOnTimeOut()`.
7. Keep button titles short enough for the modal.
8. Check that any random character helper can safely return a character for the current shift.
9. Avoid duplicate object keys in button objects.

