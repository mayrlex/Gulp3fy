import gulp from 'gulp';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import compiler from 'sass';
import gulpSass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import groupMedia from 'gulp-group-css-media-queries';
import config from '../config.js';
import paths from '../paths.js';
import postcss from 'gulp-postcss';
import postcssPresetEnv from 'postcss-preset-env';

const sass = gulpSass(compiler);

const stylesCompile = () =>
	gulp
		.src(paths.styles.src, { sourcemaps: config.isDev })
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
				},
			})
		)
		.pipe(
			sass.sync({
				outputStyle: config.isDev ? 'expanded' : 'compressed',
				includePaths: ['./node_modules'],
			})
		)
		.pipe(groupMedia())
		.pipe(
			postcss([
				postcssPresetEnv({
					features: {
						'custom-properties': { preserve: false },
					},
				}),
			])
		)
		.pipe(
			gulpif(
				config.isProd,
				cleanCss({
					level: {
						1: {
							all: true,
							roundingPrecision: false,
						},

						2: {
							all: true,
							mergeIntoShorthands: false,
							mergeSemantically: false,
							overrideProperties: false,
							reduceNonAdjacentRules: false,
							removeUnusedAtRules: false,
							restructureRules: false,
						},
					},
				})
			)
		)
		.pipe(gulp.dest(paths.styles.dest, { sourcemaps: '.' }));

export default stylesCompile;
