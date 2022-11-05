import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import svgSprite from 'gulp-svg-sprite';
import path from '../config/path.js';

const spriteBuild = () => {
	return gulp
		.src(path.sprites.src.images)
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

const spriteIconsBuild = () => {
	return gulp
		.src(path.sprites.src.icons.main)
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

const spriteExcIconsBuild = () => {
	return gulp
		.src(path.sprites.src.icons.exception)
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
						sprite: '../sprite-exc-icons.svg',
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

export const spritesBuild = gulp.parallel(spriteBuild, spriteIconsBuild, spriteExcIconsBuild);
export const spritesWatch = () => {
	gulp.watch([path.sprites.watch.icons, path.sprites.watch.images], spritesBuild);
};
