import sync from 'browser-sync';
import config from '../config.js';
import paths from '../paths.js';

const server = callback => {
	sync.create().init({
		server: {
			baseDir: paths.output,
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

		port: config.server.port,
		open: config.server.open,
		notify: config.server.notify,
	});

	callback();
};

export default server;
