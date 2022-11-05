import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import favicons from 'gulp-favicons';
import path from '../config/path.js';
import { manifest } from '../../config.js';

const faviconsBuild = () =>
	gulp
		.src(path.favicon.src)
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
				appName: manifest.name,
				appShortName: manifest.shortname,
				appDescription: manifest.description,
				developerName: manifest.devName,
				developerURL: manifest.devUrl,
				version: manifest.version,
				lang: manifest.lang,
				background: manifest.bg,
				theme_color: manifest.themeColor,
				display: manifest.display,
				orientation: manifest.orientation,
				url: manifest.url,
				scope: '/',
				start_url: '/',
				icons: {
					android: manifest.icons.android,
					appleIcon: manifest.icons.appleIcon,
					appleStartup: manifest.icons.appleStartup,
					coast: manifest.icons.coast,
					favicons: manifest.icons.favicons,
					firefox: manifest.icons.firefox,
					windows: manifest.icons.windows,
					yandex: manifest.icons.yandex,
				},
			})
		)
		.pipe(gulp.dest(path.favicon.dest));

export default faviconsBuild;
