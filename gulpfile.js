import gulp from 'gulp';
import { clearDist, clearSrc, clearFonts } from './gulp/tasks/clean.js';
import buildMarkup from './gulp/tasks/markup.js';
import buildStyles from './gulp/tasks/styles.js';
import buildScripts from './gulp/tasks/scripts.js';
import convertTTFtoWOFF2 from './gulp/tasks/fonts.js';
import images from './gulp/tasks/images.js';
import sprites from './gulp/tasks/sprites.js';
import {
	markupWatch,
	stylesWatch,
	scriptsWatch,
	imagesWatch,
	spritesWatch,
	copyResourcesWatch,
} from './gulp/tasks/watcher.js';
import copy, { copyFonts } from './gulp/tasks/copy.js';
import zip from './gulp/tasks/zip.js';
import server from './gulp/tasks/server.js';
import config from './gulp/config.js';

const tasks = [];
const watchers = [];
const fonts = gulp.series(convertTTFtoWOFF2, clearFonts, copyFonts);

if (config.task.markup) tasks.push(buildMarkup), watchers.push(markupWatch);
if (config.task.styles) tasks.push(buildStyles), watchers.push(stylesWatch);
if (config.task.scripts) tasks.push(buildScripts), watchers.push(scriptsWatch);
if (config.task.fonts) tasks.push(fonts);
if (config.task.images) tasks.push(images), watchers.push(imagesWatch);
if (config.task.sprites) tasks.push(sprites), watchers.push(spritesWatch);
if (config.task.copy) tasks.push(copy), watchers.push(copyResourcesWatch);

const dev = gulp.series(clearDist, tasks, gulp.parallel(watchers, server));
const prod = gulp.series(clearDist, tasks);
const archiving = gulp.series(clearDist, tasks, zip);

export { dev };
export { prod };
export { archiving };
export { convertTTFtoWOFF2 };
export { clearSrc };
