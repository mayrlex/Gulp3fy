import gulp from 'gulp';
import { path } from './config.js';
import clean from './gulp/tasks/clean.js';
import server from './gulp/tasks/server.js';
import { viewsBuild, viewsWatch } from './gulp/tasks/views.js';
import { stylesBuild, stylesWatch } from './gulp/tasks/styles.js';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts.js';
import { fontsBuild, fontsWatch } from './gulp/tasks/fonts.js';
import { imagesBuild, imagesWatch } from './gulp/tasks/images.js';
import { spritesBuild, spritesWatch } from './gulp/tasks/sprites.js';
import { faviconBuild, faviconWatch } from './gulp/tasks/favicon.js';

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
