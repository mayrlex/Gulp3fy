import del from 'del';
import path from '../config';

const clean = () => del(path.dest);

export default clean;
