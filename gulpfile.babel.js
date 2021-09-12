import gulp from 'gulp';
import path from './gulp/config';
import clean from './gulp/tasks/clean';
import server from './gulp/tasks/server';
import { viewsBuild, viewsWatch } from './gulp/tasks/views';
import { stylesBuild, stylesWatch } from './gulp/tasks/styles';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts';
import { fontsBuild, fontsWatch } from './gulp/tasks/fonts';
import { imagesBuild, imagesWatch } from './gulp/tasks/images';
import { spritesBuild, spritesWatch } from './gulp/tasks/sprites';
import { faviconBuild, faviconWatch } from './gulp/tasks/favicon';

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
