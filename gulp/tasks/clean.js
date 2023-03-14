import { deleteAsync as del } from 'del';
import paths from '../config/paths.js';

const clean = () => del(paths.dest);
const cleanBefore = () => del(paths.clean.before);
const cleanAfrer = () => del(paths.clean.after);

export default clean;
export { cleanBefore };
export { cleanAfrer };
