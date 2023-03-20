import paths from './paths.js';

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';

const config = {
	mode,
	isProd: !isDev,
	isDev,

	task: {
		markup: true,
		styles: true,
		scripts: true,
		fonts: true,
		images: true,
		sprites: true,
		copy: true,
	},

	server: {
		port: 3300,
		open: false,
		notify: false,
	},

	clean: {
		start: ['./.git', './**/.gitkeep'],
		end: ['./node_modules'],
		fonts: [`${paths.fonts.input}*.*`, `!${paths.fonts.woff2}`],
	},
};

export default config;
