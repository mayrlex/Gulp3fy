import sync from 'browser-sync';
import path from '../config.js';

const server = (callback) => {
	sync.create().init({
		server: {
			baseDir: path.dest,
		},
		files: [
			path.views.dest,
			path.styles.dest,
			path.scripts.dest,
			{
				match: `${path.images.dest}/**/*`,
				fn() {
					this.stream();
				},
			},
		],
		open: false,
		notify: false,
	});

	callback();
};

export default server;
