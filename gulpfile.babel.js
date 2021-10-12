import gulp from 'gulp';
import { path } from './config.js';
import clean from './gulp/clean.js';
import server from './gulp/server.js';
import { builds, watchers } from './gulp/tasks.js'

path.setEnv();

export const build = gulp.series(
	clean,
	gulp.parallel(builds)
);

export const watch = gulp.series(
	build,
	server,
	gulp.parallel(watchers)
);
