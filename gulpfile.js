import gulp from 'gulp';
import clean, { cleanBefore, cleanAfrer } from './gulp/tasks/clean.js';
import server from './gulp/tasks/server.js';
import zip from './gulp/tasks/zip.js';
import { build, watch } from './gulp/config/tasks.js';
import { fontsTTF, fontsWOFF2 } from './gulp/tasks/fonts.js';
import faviconsBuild from './gulp/tasks/favicon.js';

const dev = gulp.series(clean, build, gulp.parallel(watch, server));
const prod = gulp.series(clean, build);
const archiving = gulp.series(clean, build, zip);

export { dev };
export { prod };
export { archiving };
export { fontsTTF, fontsWOFF2 };
export { faviconsBuild };
export { cleanBefore, cleanAfrer };
