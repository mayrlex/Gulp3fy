import gulp from 'gulp';
import { clearDist, clearSrc, clearFonts } from './gulp/tasks/clean.js';
import { markupCompile, markupWatch } from './gulp/tasks/markup.js';
import { stylesCompile, stylesWatch } from './gulp/tasks/styles.js';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts.js';
import getFontsWoff2 from './gulp/tasks/fonts.js';
import { images, imagesWatch } from './gulp/tasks/images.js';
import {
	sprites,
	imagesSpriteWatch,
	iconsMonoSpriteWatch,
	iconsMultiSpriteWatch,
} from './gulp/tasks/sprites.js';
import { copy, copyWatch, copyFonts } from './gulp/tasks/copy.js';
import zip from './gulp/tasks/zip.js';
import server from './gulp/tasks/server.js';
import config from './gulp/config.js';

const build = [];
const watch = [];
const fonts = gulp.series(getFontsWoff2, clearFonts, copyFonts);

config.task.markup ? [build.push(markupCompile), watch.push(markupWatch)] : null;
config.task.styles ? [build.push(stylesCompile), watch.push(stylesWatch)] : null;
config.task.scripts ? [build.push(scriptsBuild), watch.push(scriptsWatch)] : null;
config.task.fonts ? build.push(fonts) : null;
config.task.images ? [build.push(images), watch.push(imagesWatch)] : null;
// prettier-ignore
config.task.sprites ? [
			build.push(sprites),
			watch.push(imagesSpriteWatch, iconsMonoSpriteWatch, iconsMultiSpriteWatch)
		] : null;
config.task.copy ? [build.push(copy), watch.push(copyWatch)] : null;

const dev = gulp.series(clearDist, build, gulp.parallel(watch, server));
const prod = gulp.series(clearDist, build);
const archiving = gulp.series(clearDist, build, zip);

export { dev };
export { prod };
export { archiving };
export { getFontsWoff2 };
export { clearSrc };
