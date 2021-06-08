const source = 'src';
const compiled = 'build';

const path = {
    src: source,
    dest: compiled,

    views: {
        src: `${source}/views/*.pug`,
        dest: compiled,
        emitty: `${source}/views`,
        watch: `${source}/views/**/*.pug`,
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
        srcMono: `${source}/assets/icons/mono/*.svg`,
        srcMulti: `${source}/assets/icons/multi/*.svg`,
        dest: `${compiled}/assets/images`,
        watchMono: `${source}/assets/icons/mono/*.svg`,
        watchMulti: `${source}/assets/icons/multi/*.svg`,
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
