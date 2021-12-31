import sync from 'browser-sync';
import { path } from '../config/path.js';
import { serverConfig } from '../../config.js';

const server = (done) => {
	sync.init({
		server: {
			baseDir: `${path.compiled}`,
		},
		port: serverConfig.port,
		open: serverConfig.open,
		notify: serverConfig.notify,
	});
};

export default server;
