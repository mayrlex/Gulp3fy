import gulp from 'gulp';
import { path } from './config.js';
import clean from './gulp/clean.js';
import server from './gulp/server.js';
import { viewsBuild, viewsWatch } from './gulp/views.js';
import { stylesBuild, stylesWatch } from './gulp/styles.js';
import { scriptsBuild, scriptsWatch } from './gulp/scripts.js';
import { fontsBuild, fontsWatch } from './gulp/fonts.js';
import { imagesBuild, imagesWatch } from './gulp/images.js';
import { spritesBuild, spritesWatch } from './gulp/sprites.js';
import { faviconBuild, faviconWatch } from './gulp/favicon.js';

path.setEnv();

export const build = gulp.series(
	clean,
	gulp.parallel(
		viewsBuild,
		stylesBuild,
		scriptsBuild,
		fontsBuild,
		imagesBuild,
		spritesBuild,
		faviconBuild
	)
);

export const watch = gulp.series(
	build,
	server,
	gulp.parallel(
		viewsWatch,
		stylesWatch,
		scriptsWatch,
		fontsWatch,
		imagesWatch,
		spritesWatch,
		faviconWatch
	)
);
