//##############################
// 1. PATHS
//##############################
const source = 'src';
const compiled = 'build';

const path = {
	src: source,
	dest: compiled,

	views: {
		src: `${source}/views/*.pug`,
		dest: compiled,
		watch: `${source}/views/**/*.pug`,
		emitty: `${source}/views`,
	},

	styles: {
		src: `${source}/styles/main.scss`,
		dest: `${compiled}/assets/css`,
		watch: `${source}/styles/**/*.scss`,
	},

	scripts: {
		src: `${source}/scripts/main.js`,
		dest: `${compiled}/assets/js`,
		watch: `${source}/scripts/**/*.js`,
	},

	fonts: {
		src: `${source}/assets/fonts/**/*.ttf`,
		dest: `${compiled}/assets/fonts`,
		watch: `${source}/assets/fonts/**/*.ttf`,
	},

	images: {
		src: `${source}/assets/images/**/*.{jpg,png,svg,gif,ico,webp}`,
		dest: `${compiled}/assets/images`,
		watch: `${source}/assets/images/**/*.{jpg,png,svg,gif,ico,webp}`,
		webp: `${source}/assets/images/**/*.{jpg,png}`,
	},

	icons: {
		src: {
			mono: `${source}/assets/icons/mono/*.svg`,
			multi: `${source}/assets/icons/multi/*.svg`,
		},
		dest: `${compiled}/assets/images`,
		watch: {
			mono: `${source}/assets/icons/mono/*.svg`,
			multi: `${source}/assets/icons/multi/*.svg`,
		},
	},

	favicon: {
		src: `${source}/assets/favicon/favicon.{jpg,png,svg,gif,ico,webp}`,
		dest: `${compiled}/assets/images/common/`,
		watch: `${source}/assets/favicon/favicon.{jpg,png,svg,gif,ico,webp}`,
	},

	setEnv() {
		this.isProd = process.argv.includes('--prod');
		this.isDev = !this.isProd;
	},
};

//##############################
// 2. SERVER
//##############################
const srv = {
	port: 3300,
	path: path.dest,
	open: false,
	notify: false,
};

//##############################
// 3. Pretty
//##############################
const pretty = {
	indent_size: 4,
	indent_char: ' ',
	unformatted: ['code', 'pre', 'em', 'strong', 'i', 'b', 'br', 'span'],
};

//##############################
// 4. Image quality
//##############################
const quality = {
	jpeg: 80,
	png: [0.8, 0.9],
	webp: 80,
};

//##############################
// 5. Exports
//##############################
export { path };
export { srv };
export { pretty };
export { quality };
