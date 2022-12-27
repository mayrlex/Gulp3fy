import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import svgSprite from 'gulp-svg-sprite';
import path from '../config/path.js';
import { task } from '../../config.js';

const spritesTasks = [];

const spriteImagesBuild = () => {
	return gulp
		.src(path.sprites.src.images)
		.pipe(
			plumber(
				notify.onError({
					title: 'IMAGES SPRITES',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: '../images.svg',
						example: true,
					},
				},
				shape: {
					transform: [
						{
							svgo: {
								plugins: [
									{ removeAttrs: { attrs: ['class', 'data-name'] } },
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
		.src(path.sprites.src.icons.main)
		.pipe(
			plumber(
				notify.onError({
					title: 'ICON SPRITES',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			svgSprite({
				mode: { stack: { sprite: '../icons.svg', example: true } },
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
		.pipe(gulp.dest(path.sprites.dest));
};

const spriteEIconsBuild = () => {
	return gulp
		.src(path.sprites.src.icons.exception)
		.pipe(
			plumber(
				notify.onError({
					title: 'EICONS SPRITES',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			svgSprite({
				mode: {
					stack: {
						sprite: '../e-icons.svg',
						example: true,
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

		.pipe(gulp.dest(path.sprites.dest));
};

task.sprites.images ? [spritesTasks.push(spriteImagesBuild)] : null;
task.sprites.icons ? [spritesTasks.push(spriteIconsBuild)] : null;
task.sprites.eIcons ? [spritesTasks.push(spriteEIconsBuild)] : null;

export const spritesBuild = gulp.parallel(spritesTasks);
export const spritesWatch = () => {
	gulp.watch([path.sprites.watch.icons, path.sprites.watch.images], spritesBuild);
};
