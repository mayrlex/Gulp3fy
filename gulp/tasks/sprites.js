import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import path from '../config';

const spriteMono = () => (
    gulp.src(path.icons.srcMono)
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: '../sprites/sprite-mono.svg',
                },
            },
            shape: {
                transform: [{
                    svgo: {
                        plugins: [{
                            removeAttrs: {
                                attrs: ['class', 'data-name', 'fill.*', 'stroke.*'],
                            },
                        }],
                    },
                }],
            },
        }))
        .pipe(gulp.dest(path.icons.dest))
);

const spriteMulti = () => (
    gulp.src(path.icons.srcMulti)
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: '../sprites/sprite-multi.svg',
                },
            },
            shape: {
                transform: [{
                    svgo: {
                        plugins: [{
                            removeAttrs: {
                                attrs: ['class', 'data-name'],
                            },
                        },
                        { removeUselessStrokeAndFill: false },
                        { inlineStyles: true }],
                    },
                }],
            },
        }))
        .pipe(gulp.dest(path.icons.dest))
);

export const spritesBuild = gulp.parallel(spriteMono, spriteMulti);

export const spritesWatch = () => {
    gulp.watch(path.icons.watchMono, spriteMono);
    gulp.watch(path.icons.watchMulti, spriteMulti);
};
