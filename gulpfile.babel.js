import gulp from 'gulp';
import path from './gulp/config';
import clean from './gulp/tasks/clean';
import server from './gulp/tasks/server';
import { scriptsBuild, scriptsWatch } from './gulp/tasks/scripts';
import { pugBuild, pugWatch } from './gulp/tasks/pug';
import { stylesBuild, stylesWatch } from './gulp/tasks/styles';
import { fontsBuild, fontsWatch } from './gulp/tasks/fonts';
import { imagesBuild, imagesWatch } from './gulp/tasks/images';
import { spritesBuild, spritesWatch } from './gulp/tasks/sprites';
import { faviconBuild, faviconWatch } from './gulp/tasks/favicon';
// import { backEndBuild, backEndWatch } from './gulp/tasks/backend';

path.setEnv();

export const build = gulp.series(
    clean,
    gulp.parallel(
        pugBuild,
        stylesBuild,
        scriptsBuild,
        fontsBuild,
        imagesBuild,
        spritesBuild,
        faviconBuild,
        // backEndBuild,
    ),
);

export const watch = gulp.series(
    build,
    server,
    gulp.parallel(
        pugWatch,
        stylesWatch,
        scriptsWatch,
        fontsWatch,
        imagesWatch,
        spritesWatch,
        faviconWatch,
        // backEndWatch,
    ),
);