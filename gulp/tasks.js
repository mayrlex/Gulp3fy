import { task } from '../config.js';
import { viewsBuild, viewsWatch } from './views.js';
import { stylesBuild, stylesWatch } from './styles.js';
import { scriptsBuild, scriptsWatch } from './scripts.js';
import { fontsBuild, fontsWatch } from './fonts.js';
import { imagesBuild, imagesWatch } from './images.js';
import { spritesBuild, spritesWatch } from './sprites.js';
import { faviconBuild, faviconWatch } from './favicon.js';

const builds = [
	viewsBuild,
	stylesBuild,
	scriptsBuild,
	fontsBuild,
	imagesBuild,
	spritesBuild,
	faviconBuild
];

const watchers = [
	viewsWatch,
	stylesWatch,
	scriptsWatch,
	fontsWatch,
	imagesWatch,
	spritesWatch,
	faviconWatch
];

if (task.favicon === false) {
	builds.splice(6, 1);
	watchers.splice(6, 1);
}

if (task.sprites === false) {
	builds.splice(5, 1);
	watchers.splice(5, 1);
}

if (task.images === false) {
	builds.splice(4, 1);
	watchers.splice(4, 1);
}

if (task.fonts === false) {
	builds.splice(3, 1);
	watchers.splice(3, 1);
}

if (task.scripts === false) {
	builds.splice(2, 1);
	watchers.splice(2, 1);
}

if (task.styles === false) {
	builds.splice(1, 1);
	watchers.splice(1, 1);
}

if (task.views === false) {
	builds.splice(0, 1);
	watchers.splice(0, 1);
}

export { builds };
export { watchers };