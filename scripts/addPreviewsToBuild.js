const path = require('path');
var http = require('http');
const fs = require('fs');

const pathToIndex = path.join(__dirname, '../web-build/index.html');

module.exports = function addBuildPreviewsToBuild() {
	return new Promise((resolve, reject) => {
		fs.readFile(pathToIndex, async (err, buffer) => {
			fs.copyFile(
				path.join(__dirname, '../assets/logo.png'),
				path.join(__dirname, '../web-build/logo.png'),
				err => {
					if (err) {
						return console.log('Error Found:', err);
					} else {
						const content = buffer.toString();
						console.log('Building report start.');
						if (err)
							return (() => {
								reject({ message: `Failed to read file ${pathToIndex} because ${err}` });
								console.log('Building report end.');
							})();

						//Split up the index file content in order to add new url preview images
						const workableContent =
							content && content.split && typeof content.split === 'function'
								? content.split('</title>')
								: [null];
						const previews = `
                    <meta property='og:title' content='ココFlavor Fodder.' />
                    <meta
                        property='og:description'
                        content='John the manager gets transferred and all of a sudden there is a huge void in authority in ココ. The employees begin there quest to gain power in ココ.  Christian makes the first move for power but is quickly shot down by his peers, Kasey loudly makes power moves along with Vicky via nitpicking others company group chats. Meanwhile You move full steam ahead towards power. '
                    />
                    <meta property='og:image' content='https://serene-williams-bb8bee.netlify.app/images/KoKo/logosmall.jpg' />
                    <meta property='og:image' content='https://serene-williams-bb8bee.netlify.app/images/KoKo/logosmall.jpg' />
                `;
						const newContent = `${workableContent[0]}</title>${previews}${
							workableContent[1] ? workableContent[1] : ''
						}`;
						const newBuffer = content.replace('</title>', newContent);

						fs.unlink(path.join(__dirname, '../web-build/index.html'), err => {
							if (err) {
								return console.error(err);
							}
							console.log('Deleted old index.html');
							fs.appendFile(path.join(__dirname, '../web-build/index.html'), newContent, err => {
								if (err) return console.err(err);

								console.log('Made new HTML file with previews');
								console.log('Building report end.');
							});
						});
					}
				}
			);
		});
	});
};
