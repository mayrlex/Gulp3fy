import gulp from 'gulp';
import buildMarkup from './markup.js';
import buildStyles from './styles.js';
import buildScripts from './scripts.js';
import { optimizeImages, convertImagesToWebp } from './images.js';
import { imagesSprite, iconsMonoSprite, iconsMultiSprite } from './sprites.js';
import { copyResources } from './copy.js';
import paths from '../paths.js';

const markupWatch = () => {
	global.isMarkupWatch = true;

	gulp.watch(paths.markup.watch, buildMarkup).on('all', (event, filepath, stats) => {
		global.emittyChangedFile = {
			path: filepath,
			stats,
		};
	});
};

const stylesWatch = () => gulp.watch(paths.styles.watch, buildStyles);
const scriptsWatch = () => gulp.watch(paths.scripts.watch, buildScripts);
const optimizeImagesWatch = () =>
	gulp.watch(`${paths.images.input}/${paths.images.pattern.default}`, optimizeImages);

const webpImagesWatch = () =>
	gulp.watch(`${paths.images.input}/${paths.images.pattern.webp}`, convertImagesToWebp);

const imagesSpriteWatch = () => gulp.watch(paths.sprites.images, imagesSprite);
const iconsMonoSpriteWatch = () => gulp.watch(paths.sprites.iconsMono, iconsMonoSprite);
const iconsMultiSpriteWatch = () => gulp.watch(paths.sprites.iconsMulti, iconsMultiSprite);
const copyResourcesWatch = () => gulp.watch(paths.resources.watch, copyResources);

const imagesWatch = [optimizeImagesWatch, webpImagesWatch];
const spritesWatch = [imagesSpriteWatch, iconsMonoSpriteWatch, iconsMultiSpriteWatch];

export { markupWatch };
export { stylesWatch };
export { scriptsWatch };
export { imagesWatch };
export { spritesWatch };
export { copyResourcesWatch };
