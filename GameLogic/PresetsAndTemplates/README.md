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
                                music.play('triumph', { volume: 0.15, loop: true });
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
						'This is the las conversation topic.'
					),
					responses: [
						{
							title: 'next',
							onPress: () => {
								exit();
							},
						},
					],
				},
			],
		};
	},
```
