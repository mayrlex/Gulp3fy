import { deleteAsync } from 'del';
import path from '../config/path.js';

const clean = () => deleteAsync(path.dest);
export default clean;
