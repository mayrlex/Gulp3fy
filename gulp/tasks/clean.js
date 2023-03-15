import { deleteAsync as del } from 'del';
import config from '../config.js';
import paths from '../paths.js';

const clearDist = () => del(paths.dest);
const clearSrc = () => {
	let clearFiles;

	if (process.argv.includes('--clear-start')) clearFiles = config.clean.start;
	if (process.argv.includes('--clear-end')) clearFiles = config.clean.end;

	return del(clearFiles);
};

const cleanFonts = () => del(config.clean.fonts);

export { clearDist };
export { cleanFonts };
export { clearSrc };
