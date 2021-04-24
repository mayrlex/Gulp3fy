const source = 'src';
const compiled = 'build';

const path = {
    src: source,
    dest: compiled,

    puges: {
        src: `${source}/puges/*.pug`,
        dest: compiled,
        emitty: `${source}/puges`,
        watch: `${source}/puges/**/*.pug`,
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
        srcMulti: `${source}/assets/icons/multi/*.{jpg,png,svg,gif,ico,webp}`,
        dest: `${compiled}/assets/icons`,
        watchMono: `${source}/assets/icons/mono/*.{jpg,png,svg,gif,ico,webp}`,
        watchMulti: `${source}/assets/icons/multi/*.{jpg,png,svg,gif,ico,webp}`,
    },

    favicon: {
        src: `${source}/assets/favicon/favicon.{jpg,png,svg,gif,ico,webp}`,
        dest: `${compiled}/assets/images/common/`,
        watch: `${source}/assets/favicon/favicon.{jpg,png,svg,gif,ico,webp}`,
    },

    backEnd: {
        src: `${source}/.htaccess`,
        dest: compiled,
        watch: `${source}/.htaccess`,
    },

    setEnv() {
        this.isProd = process.argv.includes('--prod');
        this.isDev = !this.isProd;
    },
};

export default path;
