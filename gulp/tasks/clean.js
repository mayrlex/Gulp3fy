import { deleteAsync } from 'del';
import path from '../config/path.js';

const clean = () => deleteAsync(path.dest);
const cleanBefore = () => deleteAsync(path.clean.before);
const cleanAfrer = () => deleteAsync(path.clean.after);

export default clean;
export { cleanBefore };
export { cleanAfrer };
