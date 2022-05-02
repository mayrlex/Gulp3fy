/* eslint-disable import/prefer-default-export */
import * as nodePath from 'path';
import { ftpSettings } from '../../config.js';

const root = nodePath.basename(nodePath.resolve());
const src = `./src`;
const dest = `./dist`;
const srcAssets = `${src}/assets`;
const destAssets = `${dest}/assets`;
const prod = process.argv.includes('--prod');

export const path = {
	src,
	dest,
	root,

	isProd: prod,
	isDev: !prod,

	markup: {
		src: `${src}/markup/*.pug`,
		dest,
		watch: `${src}/markup/**/*.pug`,
	},

	styles: {
		src: `${src}/styles/main.scss`,
		dest: `${destAssets}/css`,
		watch: `${src}/styles/**/*.scss`,
	},

	scripts: {
		src: `${src}/scripts/app.js`,
		dest: `${destAssets}/js`,
		watch: `${src}/scripts/**/*.js`,
	},

	fonts: {
		root: `${srcAssets}/fonts/`,
		src: {
			otf: `${srcAssets}/fonts/**/*.otf`,
			ttf: `${srcAssets}/fonts/**/*.ttf`,
			woff2: `${srcAssets}/fonts/**/*.woff2`,
		},

		dest: `${destAssets}/fonts`,
	},

	images: {
		src: [
			`${srcAssets}/images/**/*.{jpg,jpeg,png,gif,webp}`,
			`!${srcAssets}/images/common/placeholder.*`,
			`!${srcAssets}/images/common/favicon.*`,
		],

		dest: `${destAssets}/images`,
		watch: `${srcAssets}/images/**/*.{jpg,png,svg,gif,ico,webp}`,
		svg: [`${srcAssets}/images/**/*.svg`, `!${srcAssets}/images/sprite`],
		placehoder: `${srcAssets}/images/**/placeholder.png`,
	},

	sprites: {
		src: `${srcAssets}/images/sprite/**/*.svg`,
		dest: `${destAssets}/sprites`,
		watch: `${srcAssets}/images/sprite/**/*.svg`,
		icons: {
			src: {
				root: [`${srcAssets}/icons/**/*.svg`, `!${srcAssets}/icons/unreset/*.*`],
				unreset: `${srcAssets}/icons/unreset/**/*.svg`,
			},

			watch: `${srcAssets}/icons/**/*.svg`,
		},
	},

	favicon: {
		src: `${srcAssets}/images/common/favicon.{jpg,png,gif,ico,webp}`,
		dest: `${destAssets}/images/common/favicons/`,
	},

	components: {
		markup: `${src}/components/**/*.pug`,
		styles: `${src}/components/**/*.scss`,
		scripts: `${src}/components/**/*.js`,
	},

	resources: {
		src: [`${srcAssets}/resources/**/*.*`, `!${srcAssets}/resources/root/*.*`],
		dest: `${destAssets}/resources/`,
		watch: `${srcAssets}/resources/**/*.*`,

		root: {
			src: `${srcAssets}/resources/root/**/*.*`,
			dest,
		},
	},

	zip: {
		dest: `${dest}/**/*.*`,
		del: `./${root}.zip`,
		root: `./${root}.zip`,
	},

	ftp: {
		server: ftpSettings.folder,
		local: `${dest}/**/*.*`,
	},
};
