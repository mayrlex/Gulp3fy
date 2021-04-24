import sync from 'browser-sync';
import path from '../config';

const server = (callback) => {
    sync.create().init({
        server: {
            baseDir: path.dest.root,
        },
        files: [
            `${path.dest.html}/*.html`,
            `${path.dest.css}/*.css`,
            `${path.dest.js}/*.js`,
            {
                match: `${path.dest.images}/**/*`,
                fn() {
                    this.reload();
                },
            },
        ],
        open: false,
        notify: false,
    });

    callback();
};

export default server;
