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

export default path;
