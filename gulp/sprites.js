import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import { path } from '../config.js';

const spriteMono = () =>
	gulp
		.src(path.icons.src.mono)
		.pipe(
			svgSprite({
				mode: {
					symbol: {
						sprite: '../sprites/sprite-mono.svg',
					},
				},
				shape: {
					transform: [
						{
							svgo: {
								plugins: [
									{
										removeAttrs: {
											attrs: ['class', 'data-name', 'fill.*', 'stroke.*'],
										},
									},
								],
							},
						},
					],
				},
			})
		)
		.pipe(gulp.dest(path.icons.dest));

const spriteMulti = () =>
	gulp
		.src(path.icons.src.multi)
		.pipe(
			svgSprite({
				mode: {
					symbol: {
						sprite: '../sprites/sprite-multi.svg',
					},
				},
				shape: {
					transform: [
						{
							svgo: {
								plugins: [
									{
										removeAttrs: {
											attrs: ['class', 'data-name'],
										},
									},

									{ removeUselessStrokeAndFill: false },

									{ inlineStyles: true },
								],
							},
						},
					],
				},
			})
		)

		.pipe(gulp.dest(path.icons.dest));

export const spritesBuild = gulp.parallel(spriteMono, spriteMulti);

export const spritesWatch = () => {
	gulp.watch(path.icons.watch.mono, spriteMono);
	gulp.watch(path.icons.watch.multi, spriteMulti);
};
