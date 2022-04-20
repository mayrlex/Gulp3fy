import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import svgSprite from 'gulp-svg-sprite';
import { path } from '../config/path.js';
import { spriteConfig } from '../../config.js';

const spriteMono = () =>
	gulp
		.src(path.sprites.icon.src.mono)
		.pipe(
			plumber(
				notify.onError({
					title: 'SPRITES',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: '../sprites/sprite-mono.svg',
						example: spriteConfig.example.mono,
					},
				},
				shape: {
					transform: [
						{
							svgo: {
								plugins: [
									{
										removeAttrs: {
											attrs: spriteConfig.removeAttrs.mono,
										},
									},
								],
							},
						},
					],
				},
			})
		)
		.pipe(gulp.dest(path.sprites.icon.dest));

const spriteMulti = () =>
	gulp
		.src(path.sprites.icon.src.multi)
		.pipe(
			plumber(
				notify.onError({
					title: 'SPRITES',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: '../sprites/sprite-multi.svg',
						example: spriteConfig.example.multi,
					},
				},
				shape: {
					transform: [
						{
							svgo: {
								plugins: [
									{
										removeAttrs: {
											attrs: spriteConfig.removeAttrs.multi,
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

		.pipe(gulp.dest(path.sprites.icon.dest));

const spriteSvg = () =>
	gulp
		.src(path.sprites.svg.src)
		.pipe(
			plumber(
				notify.onError({
					title: 'SPRITES',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: '../sprites/sprite-svg.svg',
						example: spriteConfig.example.svg,
					},
				},
				shape: {
					transform: [
						{
							svgo: {
								plugins: [
									{
										removeAttrs: {
											attrs: spriteConfig.removeAttrs.svg,
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

		.pipe(gulp.dest(path.sprites.svg.dest));

export const spritesBuild = gulp.parallel(spriteMono, spriteMulti, spriteSvg);
export const spritesWatch = () => {
	gulp.watch(
		[path.sprites.icon.watch.mono, path.sprites.icon.watch.multi, path.sprites.svg.watch],
		spritesBuild
	);
};
