import gulp from 'gulp';
import plumber from 'gulp-plumber';
import path from '../config';

const BackEndBuild = () => (
    gulp.src(path.backEnd.src)
        .pipe(plumber())
        .pipe(gulp.dest(path.backEnd.dest))
);

export const backEndBuild = gulp.parallel(BackEndBuild);
export const backEndWatch = () => { gulp.watch(path.backEnd.watch, BackEndBuild); };
