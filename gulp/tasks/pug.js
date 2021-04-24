import gulp from 'gulp';
import pug from 'gulp-pug';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import { setup as emittySetup } from '@zoxon/emitty';
import pugIncludeGlob from 'pug-include-glob';
import path from '../config';

const emittyPug = emittySetup(path.puges.emitty, 'pug', {
    makeVinylFile: true,
});

global.isPugWatch = false;
global.emittyChangedFile = {
    path: '',
    stats: null,
};

export const pugBuild = () => (
    gulp.src(path.puges.src)
        .pipe(plumber())
        .pipe(
            gulpif(
                global.isPugWatch,
                emittyPug.stream(
                    global.emittyChangedFile.path,
                    global.emittyChangedFile.stats,
                ),
            ),
        )
        .pipe(pug({ pretty: '    ', plugins: [pugIncludeGlob()] }))
        .pipe(gulp.dest(path.puges.dest))
);

export const pugWatch = () => {
    global.isPugWatch = true;

    gulp.watch(path.puges.watch, pugBuild)
        .on('all', (filepath, stats) => {
            global.emittyChangedFile = {
                path: filepath,
                stats,
            };
        });
};
