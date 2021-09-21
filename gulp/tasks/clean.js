import del from 'del';
import path from '../config.js';

const clean = () => del(path.dest);

export default clean;
