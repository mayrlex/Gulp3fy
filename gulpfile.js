import gulp from 'gulp';
import clean from './gulp/tasks/clean.js';
import server from './gulp/tasks/server.js';
import zip from './gulp/tasks/zip.js';
import { builds, watchers } from './gulp/config/tasks.js';
import { fontsConvertOTF } from './gulp/tasks/fonts.js';
import faviconsBuild from './gulp/tasks/favicon.js';

const dev = gulp.series(clean, builds, gulp.parallel(watchers, server));
const prod = gulp.series(clean, builds);
const archiving = gulp.series(clean, builds, zip);

export { dev };
export { prod };
export { archiving };
export { fontsConvertOTF };
export { faviconsBuild };
