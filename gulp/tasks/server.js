import sync from 'browser-sync';
import path from '../config/path.js';
import { serverSettings } from '../../config.js';

const server = (done) => {
	sync.init({
		server: {
			baseDir: `${path.dest}`,
		},
		port: serverSettings.port,
		open: serverSettings.open,
		notify: serverSettings.notify,
	});
};

export default server;
