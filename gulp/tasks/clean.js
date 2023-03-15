import { deleteAsync as del } from 'del';
import config from '../config.js';
import paths from '../paths.js';

const clean = () => del(paths.dest);
const cleanBefore = () => del(config.clean.before);
const cleanAfrer = () => del(config.clean.after);
const cleanFonts = () => del(config.clean.fonts);

export default clean;
export { cleanBefore };
export { cleanAfrer };
export { cleanFonts };
