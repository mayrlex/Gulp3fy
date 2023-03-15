import paths from './paths.js';

const config = {
	isProd: process.argv.includes('--production'),
	isDev: process.argv.includes('--development'),

	task: {
		markup: true,
		styles: true,
		scripts: true,
		fonts: true,
		images: true,
		sprites: {
			images: false,
			icons: true,
			eIcons: false,
		},
		copy: true,
	},

	server: {
		port: 3300,
		open: false,
		notify: false,
	},

	clean: {
		start: ['./.git', `${paths.src}/**/.gitkeep`],
		end: ['./node_modules'],
		fonts: [`${paths.fonts.src.main}*.*`, `!${paths.fonts.src.woff2}`],
	},
};

export default config;
