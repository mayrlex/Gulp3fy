import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import svgSprite from 'gulp-svg-sprite';
import { path } from '../config/path.js';
import { spriteSettings } from '../../config.js';

const spriteBuild = () => {
	return gulp
		.src(path.sprites.src)
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
						sprite: '../sprite.svg',
						example: spriteSettings.example.sprite,
					},
				},
				shape: {
					transform: [
						{
							svgo: {
								plugins: [
									{
										removeAttrs: {
											attrs: spriteSettings.removeAttrs.sprite,
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

		.pipe(gulp.dest(path.sprites.dest));
};

const spriteIconsBuild = () => {
	return gulp
		.src(path.sprites.icons.src.root)
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
						sprite: '../sprite-icons.svg',
						example: spriteSettings.example.icons,
					},
				},
				shape: {
					transform: [
						{
							svgo: {
								plugins: [
									{
										removeAttrs: {
											attrs: spriteSettings.removeAttrs.icons,
										},
									},
								],
							},
						},
					],
				},
			})
		)
		.pipe(gulp.dest(path.sprites.dest));
};

const spriteUIconsBuild = () => {
	return gulp
		.src(path.sprites.icons.src.unreset)
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
						sprite: '../sprite-u-icons.svg',
						example: spriteSettings.example.unresetIcons,
					},
				},
				shape: {
					transform: [
						{
							svgo: {
								plugins: [
									{
										removeAttrs: {
											attrs: spriteSettings.removeAttrs.unresetIcons,
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

		.pipe(gulp.dest(path.sprites.dest));
};

export const spritesBuild = gulp.parallel(spriteBuild, spriteIconsBuild, spriteUIconsBuild);
export const spritesWatch = () => {
	gulp.watch([path.sprites.watch, path.sprites.icons.watch], spritesBuild);
};
