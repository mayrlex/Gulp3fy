import { deleteAsync as del } from 'del';
import config from '../config.js';
import paths from '../paths.js';

const clearDist = () => del(paths.output);
const clearSrc = () => {
	let clearFiles;

	if (config.mode === 'clear-start') clearFiles = config.clean.start;
	if (config.mode === 'clear-end') clearFiles = config.clean.end;

	return del(clearFiles);
};

const clearFonts = () => del(config.clean.fonts);

export { clearDist };
export { clearFonts };
export { clearSrc };
