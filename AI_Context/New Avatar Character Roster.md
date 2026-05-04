# New Avatar Character Roster

## New Permanent Characters Added

These avatar files did not have permanent roster characters, so new entries were added to `components/tempOfflineBackend/characters.ts`.

| Character | Avatar key | Job for now | Personality |
| --- | --- | --- | --- |
| Deven D | `Deven` | cook | confident |
| Ve V | `Ve` | server | reserved |
| Stefene FNU | `Stefene` | cook | challenging |
| Cedric C | `Cedric` | cook | organized |

## Existing Characters Updated With Avatars

The avatar registry now includes all current files in `assets/avatars`, and existing roster characters were given avatar keys where they were missing them. This includes Breanna, Jesse, Hiroki, Kevin, Valerie, Dio, Yang, Ethan, Steaven, Justin, Gianna, Josh, Melanie, Keith, Tyler, Christian, Kasey, Mark, Philip, Taka, Carlose, and David.

`John Alvas` uses `John A.png`. `John The Manager` is a different identity and uses `John_The_Manager.png`.

## Manager Characters For Now

These are story/manager characters, but for now they are regular cook characters when they are in the permanent roster:

| Character | Current roster treatment |
| --- | --- |
| Steaven Mugnaia | cook |
| Stefene FNU | cook |
| Cedric C | cook |
| Carlose C | cook |

## Temporary Avatar Support

`GameLogic/Conversation/Dialog.js` now accepts a temporary avatar key in dialog settings:

```js
new Dialog(character, 'Dialog text', {
  emotion: 'Angry',
  avatar: 'John_The_Manager',
});
```

The same feature also accepts `tempAvatar` or `temporaryAvatar`. This is for temporary story-only identities like John the Man, Mysterious Man, and Sleepy-Head once their temporary avatar assets are ready. Hirokitron now has a temporary story avatar key: `Hirokitron`.

## Possible Personality Options

These are the personality keys supported by the current voice asset naming system:

- `challenging`
- `confident`
- `consistent`
- `curious`
- `easyGoing`
- `friendly`
- `organized`
- `outgoing`
- `reserved`
