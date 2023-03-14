import sync from 'browser-sync';
import paths from '../config/paths.js';
import { serverSettings } from '../../config.js';

const server = callback => {
	sync.create().init({
		server: {
			baseDir: paths.dest,
		},

		files: [
			paths.server.markup,
			paths.server.styles,
			paths.server.scripts,

			{
				match: paths.server.images,
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
