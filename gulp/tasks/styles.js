import gulp from 'gulp';
import plumber from 'gulp-plumber';
import compiler from 'sass';
import gulpSass from 'gulp-sass';
import groupMedia from 'gulp-group-css-media-queries';
import postcss from 'gulp-postcss';
import postcssPresetEnv from 'postcss-preset-env';
import gulpif from 'gulp-if';
import cleanCss from 'gulp-clean-css';
import config from '../config.js';
import paths from '../paths.js';

const stylesCompile = () => {
	const sass = gulpSass(compiler);

	return gulp
		.src(paths.styles.input, { sourcemaps: config.isDev })
		.pipe(
			plumber({
				errorHandler(error) {
					console.error(error.message);
					this.emit('end');
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
		.pipe(gulp.dest(paths.styles.output, { sourcemaps: '.' }));
};

export default stylesCompile;
