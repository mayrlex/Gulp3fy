import { task } from '../../config.js';
import { markupBuild, markupWatch } from '../tasks/markup.js';
import { stylesBuild, stylesWatch } from '../tasks/styles.js';
import { scriptsBuild, scriptsWatch } from '../tasks/scripts.js';
import { imagesBuild, imagesWatch } from '../tasks/images.js';
import fontsBuild from '../tasks/fonts.js';
import faviconsBuild from '../tasks/favicon.js';
import { filesBuild, filesWatch } from '../tasks/files.js';

const builds = [
	markupBuild,
	stylesBuild,
	scriptsBuild,
	fontsBuild,
	imagesBuild,
	faviconsBuild,
	filesBuild,
];

const watchers = [
	markupWatch,
	stylesWatch,
	scriptsWatch,
	imagesWatch,
	filesWatch,
	//
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

if (task.favicon !== true) {
	builds.splice(builds.indexOf(faviconsBuild), 1);
}

if (task.files !== true) {
	builds.splice(builds.indexOf(filesBuild), 1);
	watchers.splice(watchers.indexOf(filesWatch), 1);
}

export { builds };
export { watchers };
