# Presets and Templates

## Conversation

```javascript
(dialogChanged, exit) => {
		var christian = mStats.getCharacterWithName('Christian Chewbacca');
        var narrator = new characters();
        mStats.setCharacterName(narrator, { first: 'narrator', last: '' });

		return {
			conversation01: [
                {
					dialog: new Dialog(narrator, 'Some time lator'),
					responses: [
						{
							title: 'next',
							onPress: () => {
                                music.play('triumph', PLAY_MUSIC_SETTINGS);
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						christian,
						"I am Christian and I'm talking."
					),
					responses: [
						{
							title: 'next',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				},
				{
					dialog: new Dialog(
						christian,
						'This is the last conversation topic.'
					),
					responses: [
						{
							title: 'next',
							onPress: () => {
								music.pause();
								exit();
							},
						},
					],
				},
			],
		};
	},
```

Make sure to have definded PLAY_MUSIC_SETTINGS

```typescript
const PLAY_MUSIC_SETTINGS = { volume: 0.15, loop: true };
```

## Changing dialog

Below is an example of how to change the dialog branch for a conversation

```typescript
(dialogChanged, exit) => {
		var christian = mStats.getCharacterWithName('Christian Chewbacca');

		return {
			conversation01: [
				{
					dialog: new Dialog(
						christian,
						"Do you want to change the dialog branch?"
					),
					responses: [
						{
							title: 'Yes',
							onPress: () => {
								// Pass in an object that contains the following propertys
								dialogChanged({
									//newConversationProperty is the name of property from the object that is returned from the dialog function that you want to switch branch to
									newConversationProperty: 'differentBranch',
									//newConIndex is the index of the of the dialog branch array you want to start at
									newConIndex: 0,
								});
							},
						},
						{
							title: 'No',
							onPress: () => {
								dialogChanged();
							},
						},
					],
				}
			],
			differentBranch: [
				{
					dialog: new Dialog(christian, 'This is the alternate branch'),
					responses: [
						{
							title: 'next',
							onPress: () => {
								dialogChanged();
							},
						},
					]
				},
			]
		};
	},
```

## Special Characters

Some characters are either in development or have to made up on the spot. Below is a special character implimentation of John the Manager

```typescript
var johnTheMan = new characters();
mStats.setCharacterName(johnTheMan, { first: 'John', last: 'The Manager' });
```
