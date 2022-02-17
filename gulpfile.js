import gulp from 'gulp';
import clean from './gulp/tasks/clean.js';
import server from './gulp/tasks/server.js';
import ftp from './gulp/tasks/ftp.js';
import zip from './gulp/tasks/zip.js';
import spritesBuild from './gulp/tasks/sprites.js';
import { builds, watchers } from './gulp/config/tasks.js';

const dev = gulp.series(clean, builds, gulp.parallel(watchers, server));
const prod = gulp.series(clean, builds);
const archiving = gulp.series(clean, builds, zip);
const deploy = gulp.series(clean, builds, ftp);

export { spritesBuild };

export { dev };
export { prod };
export { archiving };
export { deploy };
