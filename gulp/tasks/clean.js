import { deleteAsync as del } from 'del';
import path from '../config/path.js';

const clean = () => del(path.dest);
const cleanBefore = () => del(path.clean.before);
const cleanAfrer = () => del(path.clean.after);

export default clean;
export { cleanBefore };
export { cleanAfrer };
