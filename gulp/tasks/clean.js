import del from 'del';
import { path } from '../config/path.js';

const clean = () => del(path.compiled);
export default clean;
