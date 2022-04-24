import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';
import { path } from '../config/path.js';
import { ftpSettings } from '../../config.js';

const ftp = () => {
	ftpSettings.log = util.log;
	const ftpConnect = vinylFTP.create(ftpSettings);
	return gulp
		.src(path.ftp.server, {})
		.pipe(
			plumber(
				notify.onError({
					title: 'FTP',
					message: 'Error: <%= error.message %>',
				})
			)
		)
		.pipe(ftpConnect.dest(`/${path.ftp.server}/${path.root}`));
};

export default ftp;
