const path = require('path');
const fs = require('fs');

const root = path.join(__dirname, '..');
const webBuild = path.join(root, 'web-build');
const pathToIndex = path.join(webBuild, 'index.html');
const pathToManifest = path.join(webBuild, 'manifest.json');

module.exports = function addBuildPreviewsToBuild() {
	return new Promise((resolve, reject) => {
		try {
			copyWebIcons();
			patchManifestIcons();
			patchIndex();
			console.log('Building report end.');
			resolve();
		} catch (err) {
			reject(err);
		}
	});
};

function copyWebIcons() {
	console.log('Building report start.');
	ensureDir(path.join(webBuild, 'pwa/apple-touch-icon'));

	copyAsset('assets/logo.png', 'web-build/logo.png');
	copyAsset('assets/favicon-16.png', 'web-build/favicon-16.png');
	copyAsset('assets/favicon-32.png', 'web-build/favicon-32.png');
	copyAsset('assets/favicon.png', 'web-build/favicon.png');
	copyAsset('assets/favicon.ico', 'web-build/favicon.ico');
	copyAsset('assets/pwa/icon-192.png', 'web-build/pwa/icon-192.png');
	copyAsset('assets/pwa/icon-512.png', 'web-build/pwa/icon-512.png');
	copyAsset('assets/pwa/apple-touch-icon-180.png', 'web-build/pwa/apple-touch-icon/apple-touch-icon-180.png');
}

function patchManifestIcons() {
	if (!fs.existsSync(pathToManifest)) {
		return;
	}

	const manifest = JSON.parse(fs.readFileSync(pathToManifest, 'utf8'));
	manifest.icons = [
		{
			src: '/pwa/icon-192.png',
			sizes: '192x192',
			type: 'image/png',
			purpose: 'any maskable',
		},
		{
			src: '/pwa/icon-512.png',
			sizes: '512x512',
			type: 'image/png',
			purpose: 'any maskable',
		},
	];
	manifest.theme_color = '#FFF4DD';
	manifest.background_color = manifest.background_color || '#ffffff';

	fs.writeFileSync(pathToManifest, `${JSON.stringify(manifest, null, 2)}\n`);
	console.log('Updated manifest icons');
}

function patchIndex() {
	if (!fs.existsSync(pathToIndex)) {
		throw new Error(`Could not find ${pathToIndex}`);
	}

	const content = fs.readFileSync(pathToIndex, 'utf8');
	const previews = `
                    <meta property='og:title' content='ココFlavor Fodder.' />
                    <meta
                        property='og:description'
                        content='John the manager gets transferred and all of a sudden there is a huge void in authority in ココ. The employees begin there quest to gain power in ココ.  Christian makes the first move for power but is quickly shot down by his peers, Kasey loudly makes power moves along with Vicky via nitpicking others company group chats. Meanwhile You move full steam ahead towards power. '
                    />
                    <meta property='og:image' content='https://serene-williams-bb8bee.netlify.app/images/KoKo/logosmall.jpg' />
                    <meta property='og:image' content='https://serene-williams-bb8bee.netlify.app/images/KoKo/logosmall.jpg' />
                `;
	const pwaTags = `
                    <link rel="icon" type="image/png" sizes="192x192" href="/pwa/icon-192.png">
                    <link rel="icon" type="image/png" sizes="512x512" href="/pwa/icon-512.png">
                    <meta name="theme-color" content="#FFF4DD">
                `;
	let nextContent = content.replace('</title>', `</title>${previews}`);
	nextContent = nextContent.replace('</head>', `${pwaTags}</head>`);

	fs.writeFileSync(pathToIndex, nextContent);
	console.log('Updated HTML previews and app icons');
}

function copyAsset(source, destination) {
	const sourcePath = path.join(root, source);
	const destinationPath = path.join(root, destination);
	ensureDir(path.dirname(destinationPath));
	fs.copyFileSync(sourcePath, destinationPath);
}

function ensureDir(dir) {
	fs.mkdirSync(dir, { recursive: true });
}
