const mode = process.env.NODE_ENV;
const isDev = mode === 'development';
const src = 'src';

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
		before: ['./.git', `${src}/**/.keep`],
		after: ['./node_modules'],
	},
};

export default config;
