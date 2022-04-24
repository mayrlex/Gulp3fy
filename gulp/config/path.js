/* eslint-disable import/prefer-default-export */
import * as nodePath from 'path';
import { ftpConfig } from '../../config.js';

const root = nodePath.basename(nodePath.resolve());
const compiled = `./dist`;
const source = `./src`;

export const path = {
	source,
	compiled,
	root,

	isProd: process.argv.includes('--prod'),
	isDev: !process.argv.includes('--prod'),

	markup: {
		src: `${source}/markup/*.pug`,
		dest: compiled,
		watch: `${source}/markup/**/*.pug`,
	},

	styles: {
		src: `${source}/styles/main.scss`,
		dest: `${compiled}/assets/css`,
		watch: `${source}/styles/**/*.scss`,
	},

	scripts: {
		src: `${source}/scripts/app.js`,
		dest: `${compiled}/assets/js`,
		watch: `${source}/scripts/**/*.js`,
	},

	fonts: {
		src: {
			otf: `${source}/assets/fonts/**/*.otf`,
			ttf: `${source}/assets/fonts/**/*.ttf`,
		},
		root: `${source}/assets/fonts/`,
		dest: `${compiled}/assets/fonts`,
		watch: `${source}/assets/fonts/**/*.ttf`,
	},

	images: {
		src: [
			`${source}/assets/images/**/*.{jpg,jpeg,png,gif,webp}`,
			`!${source}/assets/images/common/placeholder.*`,
			`!${source}/assets/images/common/favicon.*`,
		],
		dest: `${compiled}/assets/images`,
		watch: `${source}/assets/images/**/*.{jpg,png,svg,gif,ico,webp}`,
		svg: [`${source}/assets/images/**/*.svg`, `!${source}/assets/images/svg`],
		placehoder: `${source}/assets/images/**/placeholder.png`,
	},

	sprites: {
		icon: {
			src: {
				mono: `${source}/assets/icons/mono/**/*.svg`,
				multi: `${source}/assets/icons/multi/**/*.svg`,
			},
			dest: `${compiled}/assets/images`,
			watch: {
				mono: `${source}/assets/icons/mono/**/*.svg`,
				multi: `${source}/assets/icons/multi/**/*.svg`,
			},
		},
		svg: {
			src: `${source}/assets/images/svg/**/*.svg`,
			dest: `${compiled}/assets/images`,
			watch: `${source}/assets/images/svg/**/*.svg`,
		},
	},

	favicon: {
		src: `${source}/assets/images/common/favicon.{jpg,png,gif,ico,webp}`,
		dest: `${compiled}/assets/images/common/favicons/`,
	},

	components: {
		markup: `${source}/components/**/*.pug`,
		styles: `${source}/components/**/*.scss`,
		scripts: `${source}/components/**/*.js`,
	},

	resources: {
		src: [`${source}/assets/resources/**/*.*`, `!${source}/assets/resources/root/*.*`],
		dest: `${compiled}/assets/resources/`,
		watch: `${source}/assets/resources/**/*.*`,

		root: {
			src: `${source}/assets/resources/root/**/*.*`,
			dest: compiled,
		},
	},

	zip: {
		compiled: `${compiled}/**/*.*`,
		del: `./${root}.zip`,
		root: `./${root}.zip`,
	},

	ftp: {
		server: ftpConfig.folder,
		local: `${compiled}/**/*.*`,
	},
};
