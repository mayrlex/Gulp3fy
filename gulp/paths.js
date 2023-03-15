import path from 'path';

const src = 'src';
const dest = 'dist';
const publicFolder = 'public';
const projectFolderName = path.basename(path.resolve());

const paths = {
	src,
	dest,
	public: publicFolder,

	markup: {
		src: `${src}/markup/*.pug`,
		dest,
		watch: `${src}/markup/**/*.pug`,
		emitty: `${src}/markup`,
	},

	styles: {
		src: `${src}/styles/main.scss`,
		dest: `${dest}/assets/css`,
		watch: `${src}/styles/**/*.scss`,
	},

	scripts: {
		src: `${src}/scripts/main.js`,
		dest: `${dest}/assets/js`,
		watch: `${src}/scripts/**/*.js`,
	},

	fonts: {
		src: {
			main: `${publicFolder}/fonts/`,
			otf: `${publicFolder}/fonts/**/*.otf`,
			ttf: `${publicFolder}/fonts/**/*.ttf`,
			woff2: `${publicFolder}/fonts/**/*.woff2`,
		},

		dest: `${dest}/assets/fonts`,
	},

	images: {
		src: {
			copy: [`${publicFolder}/images/**/*.{jpg,jpeg,png,svg,gif,webp}`],
			webp: [`${publicFolder}/images/**/*.{jpg,jpeg,png}`],
		},

		dest: `${dest}/assets/images`,
		watch: `${publicFolder}/images/**/*.{jpg,jpeg,png,svg,gif,webp}`,
	},

	sprites: {
		images: `${publicFolder}/sprite/**/*.svg`,
		iconsMono: `${publicFolder}/icons/mono/**/*.svg`,
		iconsMulti: `${publicFolder}/icons/multi/**/*.svg`,
		dest: `${dest}/assets/sprites`,
		watch: [`${publicFolder}/sprite/**/*.svg`, `${publicFolder}/icons/**/*.svg`],
	},

	favicon: {
		src: `${publicFolder}/favicon/*.{png,svg,ico}`,
		dest: `${dest}/assets/favicon/`,
	},

	resources: {
		src: [
			`${publicFolder}/resources/**/*.*`,
			`!${publicFolder}/resources/manifest.webmanifest`,
			`!${publicFolder}/resources/robots.txt`,
		],

		dest: `${dest}/assets/resources/`,
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
		dest: `${dest}/**/*.*`,
		del: `./${projectFolderName}.zip`,
		root: `./${projectFolderName}.zip`,
	},
};

export default paths;
