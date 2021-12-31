import gulp from 'gulp';
import fs from 'fs';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import { path } from '../config/path.js';

const otfToTtf = () => {
	return gulp
		.src(path.fonts.src.otf, {})
		.pipe(
			plumber(
				notify.onError({
					title: 'FONTS',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			fonter({
				formats: ['ttf'],
			})
		)
		.pipe(gulp.dest(path.fonts.dest));
};

const ttfToWoff = () => {
	return gulp
		.src(path.fonts.src.ttf, {})
		.pipe(
			plumber(
				notify.onError({
					title: 'FONTS',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(
			fonter({
				formats: ['woff'],
			})
		)
		.pipe(gulp.dest(path.fonts.src.folder))
		.pipe(gulp.src(path.fonts.src.ttf))
		.pipe(ttf2woff2())
		.pipe(gulp.dest(path.fonts.dest));
};

const fontsStyle = () => {
	const fontsFile = path.fonts.config;
	fs.readdir(path.fonts.dest, (err, fontsFiles) => {
		if (fontsFiles) {
			if (!fs.existsSync(fontsFile)) {
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (let i = 0; i < fontsFiles.lengh; i++) {
					const fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						const fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						if (fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100;
						} else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200;
						} else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300;
						} else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500;
						} else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600;
						} else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700;
						} else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
							fontWeight = 800;
						} else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900;
						} else {
							fontWeight = 400;
						}
						fs.appendFile(
							fontsFile,
							`@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url('../fonts/${fontFileName}.woff2') format('woff2), url('../fonts/${fontFileName}.woff') format('woff);\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
							cb
						);
						newFileOnly = fontFileName;
					}
				}
			} else {
				console.log('The fonts.scss file already exists. To update the file, you need to delete it!');
			}
		}
	});

	return gulp.src(path.source);
	function cb() {}
};

const fontsBuild = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
export default fontsBuild;
