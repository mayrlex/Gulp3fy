import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import favicons from 'gulp-favicons';
import config from '../config.js';
import paths from '../paths.js';

const faviconsBuild = () =>
	gulp
		.src(paths.favicon.src)
		.pipe(
			plumber(
				notify.onError({
					title: 'FAVICON',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			favicons({
				path: './',
				appName: config.manifest.name,
				appShortName: config.manifest.shortname,
				appDescription: config.manifest.description,
				developerName: config.manifest.devName,
				developerURL: config.manifest.devUrl,
				version: config.manifest.version,
				lang: config.manifest.lang,
				background: config.manifest.bg,
				theme_color: config.manifest.themeColor,
				display: config.manifest.display,
				orientation: config.manifest.orientation,
				url: config.manifest.url,
				scope: '/',
				start_url: '/',
				icons: {
					android: config.manifest.icons.android,
					appleIcon: config.manifest.icons.appleIcon,
					appleStartup: config.manifest.icons.appleStartup,
					coast: config.manifest.icons.coast,
					favicons: config.manifest.icons.favicons,
					firefox: config.manifest.icons.firefox,
					windows: config.manifest.icons.windows,
					yandex: config.manifest.icons.yandex,
				},
			})
		)
		.pipe(gulp.dest(paths.favicon.dest));

export default faviconsBuild;
