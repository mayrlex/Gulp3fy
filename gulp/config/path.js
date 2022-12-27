import * as nodePath from 'path';

const root = nodePath.basename(nodePath.resolve());
const src = `./src`;
const dest = `./dist`;
const prod = process.argv.includes('--prod');

const path = {
	src,
	dest,
	isProd: prod,
	isDev: !prod,

	markup: {
		src: `${src}/markup/*.pug`,
		dest,
		watch: `${src}/markup/**/*.pug`,
	},

	styles: {
		src: `${src}/styles/main.scss`,
		dest: `${dest}/assets/css`,
		watch: `${src}/styles/**/*.scss`,
	},

	scripts: {
		src: `${src}/scripts/app.js`,
		dest: `${dest}/assets/js`,
		watch: `${src}/scripts/**/*.js`,
	},

	fonts: {
		src: {
			main: `${src}/assets/fonts/`,
			otf: `${src}/assets/fonts/**/*.otf`,
			ttf: `${src}/assets/fonts/**/*.ttf`,
			woff2: `${src}/assets/fonts/**/*.woff2`,
		},

		dest: `${dest}/assets/fonts`,
	},

	images: {
		src: {
			main: [
				`${src}/assets/images/**/*.{jpg,jpeg,png,gif,webp}`,
				`!${src}/assets/images/common/placeholder.*`,
				`!${src}/assets/images/common/favicon.*`,
			],

			svg: [`${src}/assets/images/**/*.svg`, `!${src}/assets/images/sprite`],
			placeholder: `${src}/assets/images/**/placeholder.png`,
		},

		dest: `${dest}/assets/images`,
		watch: `${src}/assets/images/**/*.{jpg,png,svg,gif,ico,webp}`,
	},

	sprites: {
		src: {
			images: `${src}/assets/images/sprite/**/*.svg`,
			icons: {
				main: [`${src}/assets/icons/**/*.svg`, `!${src}/assets/icons/exception/*.*`],
				exception: `${src}/assets/icons/exception/**/*.svg`,
			},
		},

		dest: `${dest}/assets/sprites`,
		watch: {
			icons: `${src}/assets/icons/**/*.svg`,
			images: `${src}/assets/images/sprite/**/*.svg`,
		},
	},

	favicon: {
		src: `${src}/assets/images/common/favicon.{jpg,png}`,
		dest: `${dest}/assets/images/common/favicons/`,
	},

	resources: {
		src: {
			main: [`${src}/assets/resources/**/*.*`, `!${src}/assets/resources/exception/*.*`],
			exception: `${src}/assets/resources/exception/**/*.*`,
		},

		dest: {
			main: `${dest}/assets/resources/`,
			exception: dest,
		},

		watch: `${src}/assets/resources/**/*.*`,
	},

	zip: {
		dest: `${dest}/**/*.*`,
		del: `./${root}.zip`,
		root: `./${root}.zip`,
	},

	clean: {
		before: ['./.git'],
		after: ['./node_modules'],
	},
};

export default path;
