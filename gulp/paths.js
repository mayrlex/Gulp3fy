import path from 'path';

const src = 'src';
const dest = 'dist';
const publicFolder = 'public';
const projectFolderName = path.basename(path.resolve());

const paths = {
	input: src,
	output: dest,
	public: publicFolder,

	markup: {
		input: `${src}/markup/*.pug`,
		watch: `${src}/markup/**/*.pug`,
		emitty: `${src}/markup`,
	},

	styles: {
		input: `${src}/styles/main.scss`,
		output: `${dest}/assets/css`,
		watch: `${src}/styles/**/*.scss`,
	},

	scripts: {
		input: `${src}/scripts/main.js`,
		output: `${dest}/assets/js`,
		watch: `${src}/scripts/**/*.js`,
	},

	fonts: {
		input: `${publicFolder}/fonts/`,
		output: `${dest}/assets/fonts`,
		ttf: `${publicFolder}/fonts/**/*.ttf`,
		woff2: `${publicFolder}/fonts/**/*.woff2`,
	},

	images: {
		input: `${publicFolder}/images/**/*.{jpg,jpeg,png,svg,gif,webp}`,
		output: `${dest}/assets/images`,
		watch: `${publicFolder}/images/**/*.{jpg,jpeg,png,svg,gif,webp}`,
		webp: `${publicFolder}/images/**/*.{jpg,jpeg,png}`,
	},

	sprites: {
		images: `${publicFolder}/sprite/**/*.svg`,
		iconsMono: `${publicFolder}/icons/mono/**/*.svg`,
		iconsMulti: `${publicFolder}/icons/multi/**/*.svg`,
		output: `${dest}/assets/sprites`,
	},

	favicon: {
		input: `${publicFolder}/favicon/*.{png,svg,ico}`,
		output: `${dest}/assets/favicon/`,
	},

	resources: {
		input: [
			`${publicFolder}/resources/**/*.*`,
			`!${publicFolder}/resources/manifest.webmanifest`,
			`!${publicFolder}/resources/robots.txt`,
		],

		output: `${dest}/assets/resources/`,
		watch: `${publicFolder}/resources/**/*.*`,
		root: [
			`${publicFolder}/resources/manifest.webmanifest`,
			`${publicFolder}/resources/robots.txt`,
		],
	},

	server: {
		markup: `${dest}/*.html`,
		styles: `${dest}/assets/css/*.css`,
		scripts: `${dest}/assets/js/*.js`,
		images: `${dest}/assets/images/**/*.{jpg,jpeg,png,svg,gif,webp}`,
	},

	zip: {
		input: `${dest}/**/*.*`,
		del: `./${projectFolderName}.zip`,
		root: `./${projectFolderName}.zip`,
	},
};

export default paths;
