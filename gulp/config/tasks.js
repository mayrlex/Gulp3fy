import { task } from '../../config.js';
import { markupBuild, markupWatch } from '../tasks/markup.js';
import { stylesBuild, stylesWatch } from '../tasks/styles.js';
import { scriptsBuild, scriptsWatch } from '../tasks/scripts.js';
import { imagesBuild, imagesWatch } from '../tasks/images.js';
import { spritesBuild, spritesWatch } from '../tasks/sprites.js';
import fontsBuild from '../tasks/fonts.js';
import faviconsBuild from '../tasks/favicon.js';
import { resourcesBuild, resourcesWatch } from '../tasks/resources.js';

const builds = [
	markupBuild,
	stylesBuild,
	scriptsBuild,
	fontsBuild,
	imagesBuild,
	spritesBuild,
	faviconsBuild,
	resourcesBuild,
];

const watchers = [
	markupWatch,
	stylesWatch,
	scriptsWatch,
	imagesWatch,
	spritesWatch,
	resourcesWatch,
];

if (task.markup !== true) {
	builds.splice(builds.indexOf(markupBuild), 1);
	watchers.splice(watchers.indexOf(markupWatch), 1);
}

if (task.styles !== true) {
	builds.splice(builds.indexOf(stylesBuild), 1);
	watchers.splice(watchers.indexOf(stylesWatch), 1);
}

if (task.scripts !== true) {
	builds.splice(builds.indexOf(scriptsBuild), 1);
	watchers.splice(watchers.indexOf(scriptsWatch), 1);
}

if (task.fonts !== true) {
	builds.splice(builds.indexOf(fontsBuild), 1);
}

if (task.images !== true) {
	builds.splice(builds.indexOf(imagesBuild), 1);
	watchers.splice(watchers.indexOf(imagesWatch), 1);
}

if (task.sprites !== true) {
	builds.splice(builds.indexOf(spritesBuild), 1);
	watchers.splice(watchers.indexOf(spritesWatch), 1);
}

if (task.favicon !== true) {
	builds.splice(builds.indexOf(faviconsBuild), 1);
}

if (task.resources !== true) {
	builds.splice(builds.indexOf(resourcesBuild), 1);
	watchers.splice(watchers.indexOf(resourcesWatch), 1);
}

export { builds };
export { watchers };
