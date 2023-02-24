import sync from 'browser-sync';
import path from '../config/path.js';
import { serverSettings } from '../../config.js';

const server = callback => {
	sync.create().init({
		server: {
			baseDir: path.dest,
		},

		files: [
			path.server.markup,
			path.server.styles,
			path.server.scripts,

			{
				match: path.server.images,
				fn() {
					this.reload();
				},
			},
		],

		port: serverSettings.port,
		open: serverSettings.open,
		notify: serverSettings.notify,
	});

	callback();
};

export default server;
